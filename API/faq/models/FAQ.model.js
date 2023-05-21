const mongoose = require('mongoose');
const { iraitech_db } = require('../../../services/db.connection');

const Schema = new mongoose.Schema({
    'page_id': {
        type: mongoose.Schema.Types.ObjectId,
        ref:'web-page'
    },
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
                  if(!(v=="General"||v=="Service")){
                    return false
                  }
                  return true
            },
            msg:"invalid type"
        },
        required:true
    }
  
});

module.exports.FAQ= iraitech_db.model('faq',Schema,'faq');