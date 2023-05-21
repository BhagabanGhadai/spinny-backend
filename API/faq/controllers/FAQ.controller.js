const { default: mongoose } = require('mongoose')
const { _throw500, _throw400Err, _throw400, _throw404 } = require('../../../services/errorHandler')
const { FAQ } = require('../models/FAQ.model')

exports.CREATE_FAQ = async (req, res) => {
    if(!req.body.page_id){
        return _throw400(res, "Page ID is required!")
    }
    let newFaq = new FAQ(req.body)
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
    if (!req.query.faq_id) {
        return _throw400(res, "FAQ ID is required!")
    }

    let faq_details = null
    try {
        faq_details = await FAQ.findOne({ "_id": req.query.faq_id }).exec()
    } catch (error) {
        return _throw400(res, error)
    }

    if (!faq_details) {
        return _throw404(res,'no such faq found')
    }

    return res.status(200).json(faq_details)  
}

exports.GET_FAQ_SERVICE_TYPE = async (req, res) => {

    let faq_details = null
    try {
        faq_details = await FAQ.aggregate([
            {
                $match:{
                    type:"Service"
                }
            },
            { $group : { _id : "$page_id" } },
            {
                $lookup:{
                    from:'web-page',
                    localField:"_id",
                    foreignField:"_id",
                    as:"page-details"
                }
            }
        ]).exec()
    } catch (error) {
        return _throw400(res, error)
    }

    if (!faq_details) {
        return _throw404(res,'no such faq found')
    }

    return res.status(200).json(faq_details)  
}

exports.GET_GENERAL_FAQ = async (req, res) => {

    let faq_details = null
    try {
        faq_details = await FAQ.find({type:"General"}).exec()
    } catch (error) {
        return _throw400(res, error)
    }

    if (!faq_details.length) {
        return _throw404(res,'no such faq found')
    }

    return res.status(200).json(faq_details)  
}

exports.GET_FAQ_PAGEWISE= async (req, res) => {
    if (!req.query.page_id) {
        return _throw400(res, "PAGE ID is required!")
    }
    let faq_details = null
    try {
        faq_details = await FAQ.aggregate([
            {
                $match:{page_id:mongoose.Types.ObjectId(req.query.page_id)}
            },
            {
                $match:{type:req.query.type}
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
    if (!req.query.faq_id) {
        return _throw400(res, "FAQ ID is required!")
    }

   let faq_details = null
    try {
        faq_details = await FAQ.findOne({ "_id": req.query.faq_id }).exec()
    } catch (error) {
        return _throw400(res, error)
    }

    if (!faq_details) {
        return _throw404(res,'no such faq found')
    }

    let update_faq=null
    try{
        update_faq=await FAQ.findOneAndUpdate({_id:req.query.faq_id},req.body,{new:true}).exec()
    }catch (err){
        return _throw400Err(res,err)
    }
    if(!update_faq){
        return _throw400Err(res,'updtion failed')
    }
    return res.status(200).json({message:"update successful",data:update_faq})  
}

exports.DELETE_FAQ = async (req, res) => {
    if (!req.query.faq_id) {
        return _throw400(res, "FAQ ID is required!")
    }

   let faq_details = null
    try {
        faq_details = await FAQ.findOne({ "_id": req.query.faq_id }).exec()
    } catch (error) {
        return _throw400(res, error)
    }

    if (!faq_details) {
        return _throw404(res,'no such faq found')
    }

    let delete_faq = null
    try {
        delete_faq = await FAQ.findOneAndDelete({ "_id": req.query.faq_id }).exec()
    } catch (error) {
        return _throw400(res, error)
    }
    return res.status(200).json({message:"faq deleted successful"})  
    
}