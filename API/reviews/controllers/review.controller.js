const { env } = require('../../../env')
const { _throw500, _throw400Err, _throw400, _throw404, _throw422 } = require('../../../services/errorHandler')
const reviewModel = require('../models/review.model')
const { UPLOAD_IMAGE } = require('../../../services/cloudinary')
const {ReviewValidations} = require('../../../services/validation')
let isvalid=new ReviewValidations()

exports.ADD_REVIEW_ADMIN = async (req, res) => {
    let schema = isvalid.review_data_validations()
    const { error, value } = schema.validate(req.body)
    if (error) {
        return _throw422(res, 'invalid request', error)
    }
    let media_file=req.files
    if(!media_file.length){
       return _throw400(res,'please add media file')
    }
    try{
        let upload=await UPLOAD_IMAGE(media_file)
        req.body.media_file=upload
    }catch(err){
        return _throw400Err(res,err)
    }

    let new_review = new reviewModel(req.body)
    new_review.validate().then((_noerr) => {

        new_review.save().then(save => {
            return res.status(200).json(save)
        }).catch(err => {
            return _throw400Err(res, err)
        })
    }).catch(err => {
        return _throw400Err(res, err)
    })
}

exports.GET_SINGLE_REVIEW_ADMIN = async (req, res) => {
    let schema = isvalid.review_id_validations()
    const { error, value } = schema.validate(req.query)
    if (error) {
        return _throw422(res, 'invalid request', error)
    }
    let review_details = null
    try {
        review_details = await reviewModel.findOne({ "_id": req.query.review_id }).exec()
    } catch (error) {
        return _throw400(res, error)
    }
    if (!review_details) {
        return _throw404(res, 'no such review found')
    }
    return res.status(200).json(review_details)
}

exports.GET_ALL_REVIEW_ADMIN = async (req, res) => {
let review_list=null;
try{
    review_list=await reviewModel.aggregate([
        {
            $sort:{createdAt:-1}
        }
    ])
}catch(err){
    return _throw500(res,err)
}
if(!review_list.length){
    return _throw400(res,'no review found')
}
return res.status(200).send(review_list)
}

exports.UPDATE_REVIEW_ADMIN = async (req, res) => {
    let schema = isvalid.review_id_validations()
    const { error, value } = schema.validate(req.query)
    if (error) {
        return _throw422(res, 'invalid request', error)
    }
    let body = isvalid.update_review_validations()
    const { err, data } = body.validate(req.body)
    if (err) {
        return _throw422(res, 'invalid request', err)
    }
    let review_details = null
    try {
        review_details = await reviewModel.findOne({ "_id": req.query.review_id }).exec()
    } catch (error) {
        return _throw400(res, error)
    }
    if (!review_details) {
        return _throw404(res, 'no such review found')
    }
    if(req.files.length){
        try{
            let upload=await UPLOAD_IMAGE(req.files)
            req.body.media_file=upload
        }catch(err){
            return _throw400Err(res,err)
        }
    }
    let update_review = null
    try {
        update_review = await reviewModel.findOneAndUpdate({ _id: req.query.review_id }, req.body, { new: true }).exec()
    } catch (err) {
        return _throw400Err(res, err)
    }
    if (!update_review) {
        return _throw400Err(res, 'updtion failed')
    }
    return res.status(200).json({ message: "update successful", data: update_review })
}

exports.DELETE_REVIEW_ADMIN = async (req, res) => {
    let schema = isvalid.review_id_validations()
    const { error, value } = schema.validate(req.query)
    if (error) {
        return _throw422(res, 'invalid request', error)
    }
    let review_details = null
    try {
        review_details = await reviewModel.findOne({ "_id": req.query.review_id }).exec()
    } catch (error) {
        return _throw400(res, error)
    }
    if (!review_details) {
        return _throw404(res, 'no such review found')
    }
    try {
       let delete_review= await reviewModel.findOneAndDelete({ "_id": req.query.review_id }).exec()
    } catch (error) {
        return _throw400(res, error)
    }
    return res.status(200).json({ message: "faq deleted successful" })
}