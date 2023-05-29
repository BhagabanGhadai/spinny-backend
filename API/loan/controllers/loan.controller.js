const { _throw500, _throw400Err, _throw400, _throw404 ,_throw422} = require('../../../services/errorHandler')
const loanModel = require('../models/loan.model')
const { SEND_EMAIL_ON_LOAN } = require('../../../services/nodemailer')
const {LoanValidations} = require('../../../services/validation')
const isvalid=new LoanValidations()

exports.ADD_LOAN_REQUEST = async (req, res) => {
    let schema=isvalid.loan_request_validation()
    const { error, value } =schema.validate(req.body)
    if(error){
        return _throw422(res,'invalid request',error)
    }
    let new_loan = new loanModel(req.body)
    new_loan.validate().then((_noerr) => {

        new_loan.save().then(async (saved_loan) => {
            await SEND_EMAIL_ON_LOAN(saved_loan.email)
            return res.status(201).json(saved_loan)
        }).catch(err => {
            return _throw400Err(res, err)
        })
    }).catch(err => {
        return _throw400Err(res, err)
    })
}

exports.GET_LOAN_REQUEST_DEATILS = async (req, res) => {
    let schema=isvalid.specific_loan_details_validation()
    const { error, value } =schema.validate(req.query)
    if(error){
        return _throw422(res,'invalid request',error)
    }
    let loan_deatils = null;
    try {
        loan_deatils = await loanModel.findById(req.query.loan_id)
    } catch (err) {
        return _throw500(res, err)
    }
    if (!loan_deatils) {
        return _throw404(res, 'no such loan details found')
    }
    res.status(200).send(loan_deatils)
}

exports.GET_LOAN_REQUEST_LIST = async (req, res) => {
    try {
        let all_loan_list = await loanModel.find()
        if (!all_loan_list.length) {
            return _throw404(res, 'no loan request found')
        }
        return res.status(200).send(all_loan_list)
    } catch (err) {
        return _throw500(res, err)
    }
}

exports.GET_LOAN_BY_USER=async (req,res)=>{
    let schema=isvalid.user_id_validation()
    const { error, value } =schema.validate(req.query)
    if(error){
        return _throw422(res,'invalid request',error)
    }
    try {
        let all_loan_list = await loanModel.find({user_id:req.query.user_id})
        if (!all_loan_list.length) {
            return _throw404(res, 'no loan request found')
        }
        return res.status(200).send(all_loan_list)
    } catch (err) {
        return _throw500(res, err)
    }
}

exports.UPDATE_LOAN_REQUEST = async (req, res) => {
    let schema=isvalid.specific_loan_details_validation()
    const { error, value } =schema.validate(req.query)
    if(error){
        return _throw422(res,'invalid request',error)
    }
    try {
        let loan_deatils = await loanModel.findById(req.query.loan_id)
        if (!loan_deatils) {
            return _throw404(res, 'no such loan details found')
        }
        let update_loan_deatils = await loanModel.findOneAndUpdate(
            { _id: req.query.loan_id },
            req.body,
            { new: true }
        )
        if (!update_loan_deatils) {
            return _throw400(res, 'updation failed')
        }
        return res.status(200).send(update_loan_deatils)
    } catch (err) {
        return _throw500(res, err)
    }

}

exports.DELETE_LOAN_REQUEST = async (req, res) => {
    let schema=isvalid.specific_loan_details_validation()
    const { error, value } =schema.validate(req.query)
    if(error){
        return _throw422(res,'invalid request',error)
    }
    try {
        let loan_deatils = await loanModel.findById(req.query.loan_id)
        if (!loan_deatils) {
            return _throw404(res, 'no such loan details found')
        }
        let delete_loan_deatils = await loanModel.findOneAndDelete({ _id: req.query.loan_id })
        if (!delete_loan_deatils) {
            return _throw400(res, 'delation failed')
        }
        return res.status(200).send(delete_loan_deatils)
    } catch (err) {
        return _throw500(res, err)
    }
}