const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: 'N/A'
    },
    timeZone: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['personal', 'lecture', 'tutorial']
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 
              'Friday', 'Saturday', 'Sunday']
    },
    // date must use markModified(path) and call save after
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    description: String
})

// mayneed virutals for converting start and end time according to timezone
const Event = mongoose.model('Event', eventSchema)

export default Event