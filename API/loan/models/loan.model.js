const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    'user_id':{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user-details"
    },
    'pancard':{
        type:String
    },
    'name': {
        type: String,
        required: true
    },
    'dob':{
        type:Date
    },
    'gender': {
        type: String,
        validate:{
            validator: (v)=>{
                if(!(v=='male' || v=='female')){
                    return false
                }
                return true
            },
            msg:'Invalid Gender'
        }
    },
    'mobile': {
        type: String,
        required: true
    },
    'email': {
        type: String,
        required: true
    },
    'employement-type': {
        type: String,
        validate:{
            validator: (v)=>{
                if(!(v=='salaried' || v=='self employed' || v=='home maker')){
                    return false
                }
                return true
            },
            msg:'Invalid employement-type'
        }
    },
    'address1': {
        type: String
    },
    'address2':{
        type:String
    },
    'pincode':{
        type:Number
    },
    'city': {
        type: String
    },
    'state':{
        type:String
    }
},{timestamps:true})
module.exports = new mongoose.model('loan-details', schema, 'loan-details')