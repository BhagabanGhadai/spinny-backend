const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    'car_brand_name':{
        type:String,
        required:true
    },
    'car_brand_slug': {
        type: String,
        required: true
    },
    'car_brand_image':{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports = new mongoose.model('car-brand', schema, 'car-brand')