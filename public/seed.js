const mongoose = require('mongoose')
const fs = require('fs/promises')
const Course = require('../models/course')
const User = require('../models/user')

require('dotenv').config({
    path: '../.env'
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Mongo connection open'))
    .catch(err => console.error(err))


const seed = () => {
    fs.readFile('courses.json','utf-8')
        .then(data => {
            const parsedData = JSON.parse(data)
            for (let [key, value] of Object.entries(parsedData)){
                const course = new Course({
                    courseCode: value.courseCode,
                    courseTitle: value.courseTitle,
                    university: 'uoft',
                    term: value.term
                })
                value.sections.forEach(section => {
                    section.meetingTimes.forEach(meetingTime => {
                        if (meetingTime.startTime === null){
                            meetingTime.startTime = 'N/A'
                            meetingTime.endTime = 'N/A'
                        }
                    })
                    section.online === 'In Person' ? false : true
                })
                value.tutorials.forEach(tutorial => {
                    tutorial.meetingTimes.forEach(meetingTime => {
                        if (meetingTime.startTime === null){
                            meetingTime.startTime = 'N/A'
                            meetingTime.endTime = 'N/A'
                        }
                    })
                    tutorial.online === 'In Person' ? false : true
                })
                course.sections = value.sections
                course.tutorials = value.tutorials
                course.save()
            }
        })
        .catch(err => console.log(err))
}