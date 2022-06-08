const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true
    },
    courseTitle: String,
    // requried for identifying courses between multiple unis
    university: {
        type: String,
        lowercase: true,
        enum: ['uoft'],
        required: true
    },
    term: {
        type: String,
        enum: ['F', 'S', 'Y'],
        required: true
    },
    sections: [
        {
            sectionCode: {
                type: String,
                required: true
            },
            term: {
                type: String,
                uppercase: true,
                enum: ['F', 'S', 'Y'],
                required: true
            },
            instructors: [],
            // will only have enough information to
            // construct an event
            meetingTimes: [{
                day: {
                    type: String,
                    enum: ['Monday', 'Tuesday', 'Wednesday',
                        'Thursday', 'Friday', 'Saturday',
                        'Sunday', 'error']
                },
                startTime: {
                    type: String,
                    required: true
                },
                endTime: {
                    type: String,
                    required: true
                },
                assignedRoom1: String
            }]
        }
    ],
    tutorials: [
        {
            tutorialCode: String,
            term: {
                type: String,
                uppercase: true,
                enum: ['F', 'S', 'Y'],
                required: true
            },
            meetingTimes: [{
                day: {
                    type: String,
                    enum: ['Monday', 'Tuesday', 'Wednesday',
                        'Thursday', 'Friday', 'Saturday',
                        'Sunday', 'error']
                },
                startTime: {
                    type: String,
                    required: true
                },
                endTime: {
                    type: String,
                    required: true
                },
                assignedRoom1: String
            }]
        }

    ]
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course