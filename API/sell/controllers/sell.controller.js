const { _throw500, _throw400Err, _throw400, _throw404 } = require('../../../services/errorHandler')
const sellModel = require('../models/sell.model')
const { SEND_EMAIL_ON_LOAN } = require('../../../services/nodemailer')

exports.CREATE_SELL_REQUEST = async (req, res) => {
    let new_request = new sellModel(req.body)
    new_request.validate().then((_noerr) => {

        new_request.save().then(async (saved_request) => {
            return res.status(201).json(saved_request)
        }).catch(err => {
            return _throw400Err(res, err)
        })
    }).catch(err => {
        return _throw400Err(res, err)
    })
}

exports.GET_SELL_REQUEST_DEATILS = async (req, res) => {
    if (!req.query.sell_request_id) {
        return _throw400(res, 'sell request id required')
    }
    let sell_deatils = null;
    try {
        sell_deatils = await sellModel.findById(req.query.sell_request_id)
    } catch (err) {
        return _throw500(res, err)
    }
    if (!sell_deatils) {
        return _throw404(res, 'no such sell request details found')
    }
    res.status(200).send(sell_deatils)
}

exports.GET_SELL_REQUEST_LIST = async (req, res) => {
    try {
        let all_sell_request_list = await sellModel.find()
        if (!all_sell_request_list.length) {
            return _throw404(res, 'no loan request found')
        }
        return res.status(200).send(all_sell_request_list)
    } catch (err) {
        return _throw500(res, err)
    }
}

exports.GET_SELL_REQUEST_BY_USER=async (req,res)=>{
    if(!req.query.user_id){
        return _throw400(res,'user id is required')
    }
    try {
        let all_sell_request_list = await sellModel.find({user_id:req.query.user_id})
        if (!all_sell_request_list.length) {
            return _throw404(res, 'no sell request found')
        }
        return res.status(200).send(all_sell_request_list)
    } catch (err) {
        return _throw500(res, err)
    }
}

exports.UPDATE_SELL_REQUEST = async (req, res) => {
    if (!req.query.sell_request_id) {
        return _throw400(res, 'sell request id required')
    }
    try {
        let sell_deatils = await sellModel.findById(req.query.sell_request_id)
    if (!sell_deatils) {
        return _throw404(res, 'no such sell request details found')
    }
        let update_sell_deatils = await sellModel.findOneAndUpdate(
            { _id: req.query.sell_request_id },
            req.body,
            { new: true }
        )
        if (!update_sell_deatils) {
            return _throw400(res, 'updation failed')
        }
        return res.status(200).send(update_sell_deatils)
    } catch (err) {
        return _throw500(res, err)
    }

}

exports.DELETE_SELL_REQUEST = async (req, res) => {
    if (!req.query.sell_request_id) {
        return _throw400(res, 'sell request id required')
    }
    try {
        let sell_deatils = await sellModel.findById(req.query.sell_request_id)
    if (!sell_deatils) {
        return _throw404(res, 'no such sell request details found')
    }
        let delete_sell_deatils = await sellModel.findOneAndDelete({ _id: req.query.sell_request_id })
        if (!delete_sell_deatils) {
            return _throw400(res, 'delation failed')
        }
        return res.status(200).send(sell_request_id)
    } catch (err) {
        return _throw500(res, err)
    }
}