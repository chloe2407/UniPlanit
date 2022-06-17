const { Course } = require('../models/course')

module.exports.getCourse = async (req, res, next) => {
    // get course by courseCode and title
    // req.body should have 
    const {
        // other filters
        courseCode,
        courseTitle,
        university,
        term
    } = req.body
    const foundCourses = await Course.find({
        $and:
            [
                {
                    courseCode: {
                        $regex: courseCode ? courseCode.toUpperCase() : ''
                    }
                },
                {
                    courseTitle: {
                        $regex: courseTitle ? courseTitle : ''
                    }
                },
                {
                    university: {
                        $eq: university.toLowerCase()
                    }
                },
                {
                    term: {
                        $eq: term
                    }
                }
            ]
    }).limit(5)
    res.json(foundCourses)
}

module.exports.generateCourse = async (req, res, next) => {
    // generate code goes here

}