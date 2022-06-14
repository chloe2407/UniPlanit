const mongoose = require('mongoose')

const backgroundSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        required: true
    },
    savedTime: {
        required: true,
        type: Date
    }
})

module.exports.Background =  mongoose.model('Background', backgroundSchema)