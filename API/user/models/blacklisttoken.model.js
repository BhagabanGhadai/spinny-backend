const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    'token': {
        type: String,
        required: true
    },
    createdAt:{ type: Date, expires: 1, default: Date.now }
})
schema.index({createdAt: 1},{expireAfterSeconds: 1});
module.exports = new mongoose.model('black-list-token', schema, 'black-list-token')