const { default: mongoose } = require('mongoose')
const { _throw500, _throw400Err, _throw400, _throw404 } = require('../../../services/errorHandler')
const faqModel = require('../models/FAQ.model')
const { FaqValidations } = require('../../../services/validation')
let isvalid = new FaqValidations()

exports.CREATE_FAQ = async (req, res) => {
    let schema = isvalid.faq_validation()
    const { error, value } = schema.validate(req.body)
    if (error) {
        return _throw422(res, 'invalid request', error)
    }
    let newFaq = new faqModel(req.body)
    newFaq.validate().then((_noerr) => {

        newFaq.save().then(saved_faq => {
            return res.status(200).json(saved_faq)
        }).catch(err => {
            return _throw400Err(res, err)
        })
    }).catch(err => {
        return _throw400Err(res, err)
    })
}

exports.GET_FAQ = async (req, res) => {
    let schema = isvalid.faq_id_validation()
    const { error, value } = schema.validate(req.query)
    if (error) {
        return _throw422(res, 'invalid request', error)
    }
    let faq_details = null
    try {
        faq_details = await faqModel.findOne({ "_id": req.query.faq_id }).exec()
    } catch (error) {
        return _throw400(res, error)
    }
    if (!faq_details) {
        return _throw404(res, 'no such faq found')
    }
    return res.status(200).json(faq_details)
}

exports.GET_FAQ_LIST = async (req, res) => {

    let faq_details = null
    try {
        faq_details = await faqModel.aggregate([
            {
                $match: { type: req.query.type }
            }
        ]
        ).exec()
    } catch (error) {
        return _throw400(res, error)
    }

    if (!faq_details.length) {
        return res.status(200).json([])
    }

    return res.status(200).json(faq_details)
}

exports.UPDATE_FAQ = async (req, res) => {
    let schema = isvalid.faq_id_validation()
    const { error, value } = schema.validate(req.query)
    if (error) {
        return _throw422(res, 'invalid request', error)
    }
    let body = isvalid.update_faq_validation()
    const { err, data } = body.validate(req.body)
    if (err) {
        return _throw422(res, 'invalid request', err)
    }

    let faq_details = null
    try {
        faq_details = await faqModel.findOne({ "_id": req.query.faq_id }).exec()
    } catch (error) {
        return _throw400(res, error)
    }

    if (!faq_details) {
        return _throw404(res, 'no such faq found')
    }

    let update_faq = null
    try {
        update_faq = await faqModel.findOneAndUpdate({ _id: req.query.faq_id }, req.body, { new: true }).exec()
    } catch (err) {
        return _throw400Err(res, err)
    }
    if (!update_faq) {
        return _throw400Err(res, 'updtion failed')
    }
    return res.status(200).json({ message: "update successful", data: update_faq })
}

exports.DELETE_FAQ = async (req, res) => {
    let schema = isvalid.faq_id_validation()
    const { error, value } = schema.validate(req.query)
    if (error) {
        return _throw422(res, 'invalid request', error)
    }
    let faq_details = null
    try {
        faq_details = await faqModel.findOne({ "_id": req.query.faq_id }).exec()
    } catch (error) {
        return _throw400(res, error)
    }

    if (!faq_details) {
        return _throw404(res, 'no such faq found')
    }

    let delete_faq = null
    try {
        delete_faq = await faqModel.findOneAndDelete({ "_id": req.query.faq_id }).exec()
    } catch (error) {
        return _throw400(res, error)
    }
    return res.status(200).json({ message: "faq deleted successful" })

}