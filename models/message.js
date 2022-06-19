const mongoose = require('mongoose')
const User = require('./user')

const messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})


const Message = mongoose.model('Message', messageSchema)
module.exports = Message