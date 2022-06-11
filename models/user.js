const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose");
const { courseOneSectionSchema } = require('../models/course')
// need to set up cloudinary for user profile img

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        requried: true,
        unique: true
    },
    first: {
        type: String,
        required: true,
    },
    last: {
        type: String,
        required: true
    },
    courses: [courseOneSectionSchema],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    university: {
        type: String,
        lowercase: true,
        // add more university here
        enum: ['utsg'],
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    // path to cloud server
    profileImg: {
        type: String
    }
})

// passport set up here
userSchema.plugin(passportLocalMongoose);

userSchema.virtual('fullname').get(() => {
    return `${this.first} ${this.last}`
})

const User = mongoose.model('User', userSchema)

module.exports = User