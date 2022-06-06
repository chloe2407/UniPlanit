const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true
    },
    sections: [{
        sectionCode: String,
        term: {
            type: String,
            uppercase: true,
            required: true
        },
        prof: String,
        // custom event here
        time: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        }]
    }]
})

const Course = mongoose.model('Course', courseSchema)

export default Course