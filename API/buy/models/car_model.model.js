const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    'car_brand_id':{
        type:mongoose.Types.ObjectId,
        ref:"car-brand"
    },
    'car_model_name':{
        type:String,
        required:true
    },
    'car_model_slug': {
        type: String,
        required: true
    }
},{timestamps:true})
module.exports = new mongoose.model('car-model', schema, 'car-model')