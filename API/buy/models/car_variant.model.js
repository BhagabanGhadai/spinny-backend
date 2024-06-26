const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    'car_model_id':{
        type:mongoose.Types.ObjectId,
        ref:"car-model"
    },
    'car_variant_name':{
        type:String,
        required:true
    },
    'car_variant_slug': {
        type: String,
        required: true
    }
},{timestamps:true})
module.exports = new mongoose.model('car-variant', schema, 'car-variant')