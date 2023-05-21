const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    'name': {
        type: String,
        required: true
    },
    'mobile': {
        type: String,
        required: true
    },
    'email': {
        type: String,
    },
    'is_verified': {
        type: Boolean,
        default: false
    },
    'otp':{
        type:Number
    },
    'role': {
        type: String,
        validate:{
            validator: (v)=>{
                if(!(v=='admin' || v=='user')){
                    return false
                }
                return true
            },
            msg:'Invalid Role'
        },
        default: 'user'
    }
},{timestamps:true})
module.exports = new mongoose.model('user-details', schema, 'user-details')