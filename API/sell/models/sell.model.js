const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    'user_id':{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user-details"
    },
    'rto_location':{
        type:String,
        required:true
    },
    'made_year': {
        type: Number,
        required: true
    },
    'model':{
        type:String,
        required:true
    },
    'variant':{
        type:String,
        required:true
    },
    'number_of_owner':{
        type:Number,
        required:true
    },
    'kms_driven':{
        type:Number,
        required:true
    },
    'when_want_to_sell': {
        type: String,
        validate:{
            validator: (v)=>{
                if(!(v=='immediately' || v=='in a month' || v=='just checking price')){
                    return false
                }
                return true
            },
            msg:'Invalid type'
        }
    }
},{timestamps:true})
module.exports = new mongoose.model('sell-request-details', schema, 'sell-request-details')