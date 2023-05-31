const mongoose=require('mongoose')
const schema = new mongoose.Schema({
    'car_brand_name':{
        type:mongoose.Schema.Types.ObjectId,
        ref:""
    },
    'make_year': {
        type: Number,
        required: true
    },
    'price':{
        type:Number,
        required:true
    }
},{timestamps:true})
module.exports = new mongoose.model('car-list', schema, 'car-list')