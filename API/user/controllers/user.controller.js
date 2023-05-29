const { env } = require('../../../env')
const jwt = require('jsonwebtoken')
const { _throw500, _throw400Err, _throw400, _throw404,_throw422 } = require('../../../services/errorHandler')
const userModel = require('../models/user.model')
const blackListModel=require('../models/blacklisttoken.model')
const { RANDOM_OTP } = require('../../../services/otp')
const { SEND_EMAIL,SEND_EMAIL_ON_LOGIN } = require('../../../services/nodemailer')
const {UserValidations} = require('../../../services/validation')
let isvalid=new UserValidations()

exports.USER_SIGNUP = async (req, res) => {
    let schema=isvalid.signup_validations()
    const { error, value } =schema.validate(req.body)
    if(error){
        return _throw422(res,'invalid request',error)
    }
    try {
        let check_email_existance = await userModel.findOne({ 'email': req.body.email, is_verified: true })
        if (check_email_existance) {
            return _throw400(res, 'Email Alreday Exists')
        }
        let check_mobile_existance = await userModel.findOne({ 'mobile': req.body.mobile, is_verified: true })
        if (check_mobile_existance) {
            return _throw400(res, 'Mobile Number Alreday Exists')
        }
        req.body.otp = RANDOM_OTP()
    } catch (err) {
        return _throw500(res, err)
    }

    let new_user = new userModel(req.body)
    new_user.validate().then((_noerr) => {

        new_user.save().then(async (saved_user) => {
            await SEND_EMAIL(saved_user.email, saved_user.otp)
            return res.status(201).json(saved_user)
        }).catch(err => {
            return _throw400Err(res, err)
        })
    }).catch(err => {
        return _throw400Err(res, err)
    })
}

exports.VERIFY_OTP_ON_SIGNUP = async (req, res) => {
    if (!req.query.user_id) {
        return _throw400(res, "User ID is required!")
    }
    let user_details = null
    try {
        user_details = await userModel.findOne({ "_id": req.query.user_id, is_verified: false }).exec()
    } catch (error) {
        return _throw400(res, error)
    }
    if (!user_details) {
        return _throw404(res, 'no such user found or may be the user alreday verified')
    }
    if (user_details.otp != req.body.otp) {
        return _throw400(res, 'invalid otp')
    }
    await userModel.findOneAndUpdate({ "_id": req.query.user_id }, { "$set": { is_verified: true } }, { new: true })
        
    return res.status(200).json({ message: 'user verify successful' })
}

exports.VERIFY_OTP_ON_LOGIN = async (req, res) => {
    let schema=isvalid.login_verification_validations()
    const { error, value } =schema.validate(req.body)
    if(error){
        return _throw422(res,'invalid request',error)
    }
    let user_details = null
    try {
        user_details = await userModel.findOne({ "email": req.body.email, is_verified: true }).exec()
    } catch (error) {
        return _throw400(res, error)
    }
    if (!user_details) {
        return _throw404(res, 'no such user found or may be the user alreday verified')
    }
    if (user_details.otp != req.body.otp) {
        return _throw400(res, 'invalid otp')
    }
    
    let access_token = null
    let refresh_token = null
    let payload = {
        email: user_details.email,
        user:user_details._id,
        role: user_details.role,
        is_verified: user_details.is_verified,
        iat: Date.now()/1000
    }
    refresh_token = jwt.sign(payload, env.refresh_secretkey, { expiresIn: env.refresh_exp_time })
    access_token = jwt.sign(payload, env.access_secretkey, { expiresIn: env.access_exp_time })

    return res.status(200).json({
        "access Token": access_token,
        "refresh Token": refresh_token
    })
}

exports.RESEND_OTP = async (req, res) => {
    if (!req.query.user_id) {
        return _throw400(res, "User ID is required!")
    }
    let user_details = null
    try {
        user_details = await userModel.findOne({ "_id": req.query.user_id }).exec()
    } catch (error) {
        return _throw400(res, error)
    }
    if (user_details.is_verified===true) {
        return res.status(200).send('user alreday verified')
    }
    let otp = RANDOM_OTP()
    userModel.findOneAndUpdate({ "_id": req.query.user_id }, { "$set": { otp: otp } }, { new: true }).then(async (otp_created) => {
        if (otp_created) {
            SEND_EMAIL(user_details.email, otp).then(() => {
                return res.status(200).json({ message: 'otp resend succesfull' })
            }).catch((err) => {
                return _throw400Err(res, err)
            })
        }
    }).catch((err) => {
        return _throw400Err(res, err)
    })


}

exports.GET_SPECIFIC_USER_DETAILS = async (req, res) => {
    let schema=isvalid.specific_user_data_validations()
    const { error, value } =schema.validate(req.query)
    if(error){
        return _throw422(res,'invalid request',error)
    }
    let user_details = null
    try {
        user_details = await userModel.findOne({ "_id": req.query.user_id, "is_verified": true}).exec()
    } catch (error) {
        return _throw400(res, error)
    }
    return res.status(200).json(user_details)
}

exports.GET_USER_LIST_ADMIN = async (req, res) => {

    let user_list = null
    try {
        user_list = await userModel.aggregate([
            {
                $match: {
                    "is_verified": true
                }
            }
        ])
    } catch (error) {
        return _throw400(res, error)
    }
    return res.status(200).json(user_list)
}

exports.USER_LOGOUT = async (req, res) => {
    let schema=isvalid.token_validation()
    let {err,data}=schema.validate(req.body)
    if(err){
        return _throw422(res,'invalid request',err)
    }
    await blackListModel.create({token:req.body.token})
    return res.status(200).json({ message: 'logout sucessful' })
}
/**can update only the name */
exports.UPDATE_USER = async (req, res) => {
    if(!req.query.user_id){
        return _throw400(res,'user id not found')
    }
    let schema=isvalid.update_user_validations()
    const { error, value } =schema.validate(req.body)
    if(error){
        return _throw422(res,'invalid request',error)
    }
    let user_details = null
    try {
        user_details = await userModel.findOne({ "_id": req.query.user_id, "is_verified": true}).exec()
    } catch (error) {
        return _throw400(res, error)
    }
    if (!user_details) {
        return _throw404(res, 'user not found')
    }
    if (req.body.email) {
        let check_email_existance = null
        try {
            check_email_existance = await userModel.findOne({ 'email': req.body.email, is_verified: true, "is_blocked": false }).exec()
        } catch (error) {
            return _throw400(res, error)
        }
        if (check_email_existance) {
            return _throw400(res, 'Email Alreday Exists')
        }
    }
    if (req.body.mobile) {
        let check_mobile_existance = null
        try {
            check_mobile_existance = await userModel.findOne({ 'mobile': req.body.mobile, is_verified: true }).exec()
        } catch (error) {
            return _throw400(res, error)
        }
        if (check_mobile_existance) {
            return _throw400(res, 'phone Alreday Exists')
        }
    }

    let update_user = null
    try {
        update_user = await userModel.findOneAndUpdate({ "_id": req.query.user_id },
            req.body,
            { new: true }).exec()
    } catch (err) {
        return _throw400Err(res, err)
    }

    if (!update_user) {
        return _throw400(res, 'fail to update password')
    }
    return res.status(200).json({ message: 'update successful', data: update_user })
}

exports.GENERATE_ACCESS_TOKEN = async (req, res) => {
    let schema=isvalid.token_validation()
    let {err,data}=schema.validate(req.body)
    if(err){
        return _throw422(res,'invalid request',err)
    }
    jwt.verify(req.body.token, env.refresh_secretkey, (err, user) => {
        if (user) {
            let payload = {
                email: user.email,
                is_verified: user.is_verified,
                iat: Date.now()
            }
            const access_token = jwt.sign(payload, env.access_secretkey, { expiresIn: env.access_exp_time });
            return res.json({ success: true, access_token });
        } else {
            return res.json({
                success: false,
                message: "Invalid refresh token"
            });
        }
    });
};

exports.USER_LOGIN = async (req, res) => {
    let schema=isvalid.login_validations()
    const { error, value } =schema.validate(req.body)
    if(error){
        return _throw422(res,'invalid request',error)
    }
    let user_details = null
    try {
        user_details = await userModel.findOne({ 'email': req.body.email ,is_verified:true}).exec()
    } catch (error) {
        return _throw400(res, error)
    }
    if (!user_details) {
        return _throw404(res, 'user not found')
    }
    let otp=RANDOM_OTP()
    SEND_EMAIL_ON_LOGIN(user_details.email,otp).then(async()=>{
         await userModel.findOneAndUpdate({_id:user_details._id},{$set:{otp:otp}},{new:true})
        return res.status(200).send('otp send successful')
    }).catch((err)=>{
        return _throw400Err(res,err)
    })

    
}

exports.GET_PROFILE_DETAILS = async (req, res) => {

    if (!req.params.user_id) {
        return _throw400(res, "Creator ID is required!")
    }

    let user_details = null
    try {
        user_details = await User.aggregate([
            {
                $match: {
                    "_id": mongoose.Types.ObjectId(req.params.user_id)
                }
            },
            {
                $lookup: {
                    from: "creator",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "creator-details"
                }
            },
            {
                $lookup: {
                    from: "content",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "content-list"
                }
            },
            {
                $lookup: {
                    from: "dedicated-content",
                    localField: "_id",
                    foreignField: "dedicated_by",
                    as: "dedication-details"
                }
            }
        ])
    } catch (error) {
        return _throw400(res, error)
    }

    if (!user_details.length) {
        return _throw404(res, 'no such creator found')
    }
    return res.status(200).json(user_details)
}


