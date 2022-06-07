const mongoose = require('mongoose')

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
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
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
    profileImg: {
        type: String
    }
})

// passport set up here

userSchema.virtual('fullname').get(() => {
    return `${first} ${last}`
})

const User = mongoose.model('User', userSchema)

module.exports = User