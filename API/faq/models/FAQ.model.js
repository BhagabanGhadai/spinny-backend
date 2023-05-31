const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    'question': {
        type: String,
        required: true
    },
    'answer': {
        type: String,
        required: true
    },
    'type':{
        type:String,
        validate:{
            validator:(v)=>{
                  if(!(v=="buying"||v=="selling"||v=="general")){
                    return false
                  }
                  return true
            },
            msg:"invalid type"
        },
        required:true
    }
  
});

module.exports= mongoose.model('faq',Schema,'faq');