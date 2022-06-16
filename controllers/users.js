const User = require('../models/user')
const Event = require('../models/event')
const { toUTC, getEventDateTime } = require('../utils/time')
const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(duration)

const passport = require('passport')
const cloudinary = require('cloudinary').v2

// cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})


module.exports.register = async (req, res, next) => {
    // const checkIfUserExists = async (email) => {
    //     let user = await User.findOne({ email: email })
    //     return user
    // }

    // if (checkIfUserExists(req.body.email)) {

    // }
    const template =
    {
        email: req.body.email,
        username: req.body.email,
        password: req.body.password,
        first: req.body.firstName,
        last: req.body.lastName,
        courses: [],
        friends: [],
        university: "utsg",
        events: [],
        profileImg: ""
    }
    // register user with passport js
    const user = new User(template)
    console.log(user)
    User.register(user, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.send({ 'err': 'The username is already registered' })
        } else {
            passport.authenticate("local")(req, res, function () {
                console.log("Following User has been registered");
                console.log(user)
            })
        }
    })
    //return res.send({ user })
    // login user then redirect to previous page or home
    //res.redirect(app.locals.returnUrl || '/')
}

module.exports.getLoggedIn = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const user = await User.findById(req.user.id)
        console.log(user)
        res.status(200).send({ user })
    } else {
        res.status(200).send({ message: 'No valid session' })
    }
}

module.exports.login = async (req, res, next) => {
    // login code
    const user = await User.findOne({ email: req.body.username })
    console.log(user)
    res.send({ user })
}

module.exports.logout = async (req, res, next) => {
    req.session.destroy()
    // logout goes here
    req.logout(() => {
        res.redirect('/')
    })
}

module.exports.getUserEventsByDate = async (req, res, next) => {
    // req.params accepts begin or end or both
    // get all events that belongs to the current user
    // to see a event on a day, pass in 'on'
    if (req.params.begin && req.params.end) {
        const begin = new Date(req.params.begin)
        const end = new Date(req.params.end)
        const events = await Event.find({
            owner: req.user.id,
            $and: [
                {
                    start: {
                        $gte: begin,
                        $lte: end
                    }
                },
                {
                    end: {
                        $gte: begin,
                        $lte: end
                    }
                }
            ]
        })
        res.json(events)
    } else if (req.params.on) {
        const events = await Event.find({
            owner: req.user.id,
            $and: [
                {
                    start: {
                        $eq: on
                    },
                },
                {
                    end: {
                        $eq: on
                    }
                }
            ]
        })
        res.json(events)
    } else {
        const events = await Event.find({
            owner: req.user.id
        })
        res.json(events)
    }
}

module.exports.getUserEventById = async (req, res, next) => {
    // get information about specific event by event Id
    const { eventId } = req.params
    const event = await Event.find({
        id: eventId,
        owner: req.user.id,
    })
    res.json(event)
}

module.exports.patchUserEventById = async (req, res, next) => {
    // makes an update by modifying based on id
    const { eventId } = req.params
    // const event = await Event.findById(id)
    // res.json(event)
    const event = await Event.findByIdAndUpdate({
        id: eventId,
        owner: req.user.id,
    }, { ...req.body })
    // assume dates are modified
    console.log(event)
    await event.save()
    res.json(event)
}

module.exports.deleteUserEventById = async (req, res, next) => {
    // delete by id
    const { eventId } = req.params
    const user = await User.find(req.user.id)
    user.events = user.events.filter(e => e != eventId)
    await user.save()
    const result = await Event.findOneAndDelete(eventId)
    console.log(result)
    res.sendStatus(200)
}

module.exports.createNewUserEvent = async (req, res, next) => {
    console.log(req.body)
    // replace req.body.owner with req.user.id
    const user = await User.findById(req.body.owner)
    if (req.body.repeat) {
        const { repeatInterval, startDate, endDate } = req.body.event
        let diff = dayjs.duration(endDate.diff(startDate)).as('ms')
        let count = 0
        const startUTC = dayjs(toUTC(dayjs(startDate)))
        const endUTC = dayjs(toUTC(dayjs(endDate)))
        while (diff > 0) {
            const event = new Event(req.body)
            event.startTime = new Date(startUTC.add(count * repeatInterval, 'ms'))
            event.endTime = new Date(endUTC.add(count * repeatInterval, 'ms'))
            user.events.push(event)
            event.save()
            diff -= count * repeatInterval
            count += 1
        }
        user.save()
        res.sendStatus(200)
    } else {
        const event = new Event(req.body)
        // some configurations for the new event
        // event.owner = req.user.id
        // provide a start and end in local time 
        // dayjs('2022-06-08T16:05:40-07:00')
        event.start = new Date(toUTC(dayjs(req.body.start)))
        event.end = new Date(toUTC(dayjs(req.body.end)))
        user.events.push(event)
        await event.save()
        await user.save()
        res.sendStatus(200)
    }
}

module.exports.createNewUserCourse = async (req, res, next) => {
    // creates a new course for the user
    // default end
    // const userId = req.user.id
    // for testing, using req.body
    // course complies to courseOneSectionSchema
    const { userId, course } = req.body
    console.log(userId)
    console.log(course)
    const user = await User.findById(userId)
    // need an event for each meeting time for lecture and tutorial
    let isInUserCourses
    user.courses.map(c => {
        if (c.courseCode === course.courseCode) {
            isInUserCourses = true
        }
    })
    if (isInUserCourses) {
        return res.send('User already has course!')
    } else {
        await createEventByCourseMeetingTime(user, course, user.id)
        user.courses.push(course)
        await user.save()
        res.sendStatus(200)
    }
}

module.exports.deleteUserCourseByCode = async (req, res, next) => {
    // removes the course that belongs to the user
    // returns the courses after filtering
    const { userId, courseCode } = req.body
    // const userId = req.user.id
    console.log(userId, courseCode)
    const user = await User.findById(userId)
    // filter out all the courses from user
    user.courses = user.courses.filter(course => course.courseCode !== courseCode)
    // remove associated events from user events and events
    await user.populate('events')
    user.events = user.events.filter(event => {
        if (event.course) {
            event.course.courseCode !== courseCode
        }
    })
    console.log(user)
    await user.save()
    await Event.deleteMany({
        $and: [
            {
                owner: { $eq: userId },
            }, {
                courseCode: { $eq: courseCode }
            }
        ]
    })
    res.json(user.courses)
}

module.exports.saveCourseHolder = async (req, res, next) => {
    const { courseCode, university, term } = req.body
    const user = await User.find(req.user.id)
    user.courses.push({
        courseCode: courseCode,
        university: university,
        term: term
    })
    await user.save()
    res.sendStatus(200)
}

module.exports.lockCourse = async (req, res, next) => {
    const { courseCode } = req.body
    const user = await User.find(req.user.id)
    user.courses.forEach(c => {
        if (c.courseCode === courseCode) c.isLocked = !c.isLocked
    })
    await user.save()
    res.sendStatus(200)
}

module.exports.saveTimeTable = async (req, res, next) => {
    // remove all previous courses and events and save current timetable
    const user = await User.find(req.user.id)
    user.courses = []
    await user.populate({ path: 'event' })
    const eventNotCourse = []
    for (e of user.events) {
        if (!e.course) eventNotCourse.push(e)
        else {
            await Event.findByIdAndDelete({
                $and: [
                    {
                        id: { $eq: e.id }
                    },
                    {
                        owner: { $eq: user.id }
                    }
                ]
            })
        }
    }
    user.events = eventNotCourse
    // const timetable = the timetable (an array of courses with one section)
    // that the user selected. Sent back from front
    // need to create events
    const { timetable } = req.body
    timetable.forEach(course => {
        user.courses.push(course)
        createEventByCourseMeetingTime(user, course)
    })
    await user.save()
}

module.exports.newTimetable = async (req, res, next) => {
    const { courses } = req.body
    // const timetable = some function that takes in courses and 
    // returns an array of five one section course
    // send back all data or a few and along with a next page token?
    // res.json(timetable)

}

module.exports.getUserCourse = async (req, res, next) => {
    const user = await User.find(req.user.id)
    res.json(user.courses)
}

module.exports.uploadImage = async (req, res, next) => {
    const user = await User.find(req.user.id)
    const eager_transform = {
        width: 500, height: 500, crop: 'scale', format: 'jpg'
    }
    cloudinary.uploader.upload_stream(req.body.imgStream, {
        public_id: req.user.id,
        eager: eager_transform
    })
        .then(image => {
            user.profileImg = image.public_id
            user.save()
            res.sendStatus(200)
        })
        .catch(err => {
            console.error(err)
            res.sendStatus(500)
        })
}

module.exports.deleteImage = async (req, res, next) => {
    const user = await User.find(req.user.id)
    cloudinary.uploader.destroy(req.user.profileImg)
    user.profileImg = null
    await user.save()

}

const createEventByCourseMeetingTime = async (user, course) => {
    course.section.meetingTime.map(async (m) => {
        // for each meeting, create events for a year
        // get the number of weeks, and make a event with this meeting time
        // once every week
        // endDate is one year from today
        const now = dayjs()
        const endDate = course.endDate ? course.endDate : now.add(1, 'year')
        const msInWeek = dayjs.duration(7, 'days').as('ms')
        let diff = dayjs.duration(endDate.diff(now)).as('ms')
        let count = 0
        while (diff > 0) {
            const adjustedNowTime = now.add(msInWeek * count, 'ms')
            const event = new Event({
                eventName: course.courseTitle,
                // owner: req.user.id,
                owner: user.id,
                location: m.assignedRoom1,
                type: 'lecture',
                course: course,
                start: new Date(toUTC(getEventDateTime(
                    adjustedNowTime, m.day, m.startTime))),
                end: new Date(toUTC(getEventDateTime(
                    adjustedNowTime, m.day, m.endTime))),
                repeat: {
                    repeatInterval: msInWeek,
                    start: new Date(toUTC(now)),
                    end: new Date(toUTC(endDate))
                }
            })
            event.save()
            user.events.push(event)
            diff -= msInWeek
            count += 1
        }
    })
}