const mongoose=require('mongoose')
const {env}=require('../env')

exports.DB_CONNECTION=async()=>{
    try {
        await mongoose.connect(env.mongo_db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('mongodb connected');
        
    } catch (error) {
        console.error('Error ============ ON DB Connection')
        console.log(error);
    }
 
}