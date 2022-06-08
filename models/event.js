const mongoose = require('mongoose')
const { calibrateTimeToUTC } = require('../utils/time')
const { courseOneSectionSchema } = require('../models/course')

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String,
        default: 'N/A'
    },
    timeZoneOffset: {
        type: Number,
    },
    type: {
        type: String,
        lowercase: true,
        enum: ['personal', 'lecture', 'tutorial']
    },
    // course with a specified section/tutorial
    // only allow one section and tutorial
    course: {
        courseOneSectionSchema
    },
    // all dates are stored in UTC-0
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    // repeat interval is given in milliseconds
    repeat: Number,
    description: String,
})

// instead of returning time in UTC 0, we calibrate to current
// timezone before returning to user
eventSchema.virtual('calStart').get(function () {
    console.log(this.start)
    return calibrateTimeToUTC(this.start)
})

eventSchema.virtual('calEnd').get(function () {
    return calibrateTimeToUTC(this.start)
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event