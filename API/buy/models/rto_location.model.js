const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    'city_name':{
        type:String,
        required:true
    },
    'city_slug': {
        type: String,
        required: true
    },
    'city_image':{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports = new mongoose.model('rto-location', schema, 'rto-location')