const mongoose=require('mongoose')

const Schema=new mongoose.Schema({
'media_file':{
    type:Object
},
'user_full_name':{
    type:String,
    required:true
},
'user_city':{
    type:String,
    required:true
},
'user-review':{
    type:String,
    required:true
}
},{timestamps:true})

module.exports=mongoose.model('review',Schema,'review')