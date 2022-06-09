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

module.exports.register = async (req, res, next) => {
    const user = new User(req.body)
    const { password } = req.body
    // register user with passport js
    // TODO
    console.log(user)
    await user.save()
    // login user then redirect to previous page or home
    res.redirect(app.locals.returnUrl || '/')
}

module.exports.login = async (req, res, next) => {
    // login code
    res.redirect(app.locals.returnUrl || '/')
}

module.exports.logout = async (req, res, next) => {
    req.session.destroy()
    // logout goes here

    // return to home
    res.redirect('/')
}

// setting up back end for testing CRUD with fake data

module.exports.getUserEvents = async (req, res, next) => {
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
    const event = await Event.findById(eventId)
    res.json(event)
}

module.exports.patchUserEventById = async (req, res, next) => {
    // makes an update by modifying based on id
    const { eventId } = req.params
    // const event = await Event.findById(id)
    // res.json(event)
    const event = await Event.findByIdAndUpdate(eventId, req.body)
    // assume dates are modified
    console.log(event)
    event.save()
        .then(res => console.log(res))
        .then(() => res.status(200).json(event))
}

module.exports.deleteUserEventById = async (req, res, next) => {
    // delete by id
    const { eventId } = req.params
    const result = await Event.findOneAndDelete(eventId)
    console.log(result)
    res.sendStatus(200)
}

module.exports.createNewUserEvent = async (req, res, next) => {
    console.log(req.body)
    const event = new Event(req.body)
    // some configurations for the new event
    // event.owner = req.user.id
    // provide a start and end in local time 
    // dayjs('2022-06-08T16:05:40-07:00')
    event.start = new Date(toUTC(dayjs(req.body.start)))
    event.end = new Date(toUTC(dayjs(req.body.end)))
    console.log(event.start)
    await event.save(err => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
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
            while (diff >= 0) {
                diff -= msInWeek
                const adjustedNowTime = now.add(msInWeek * count, 'ms')
                const event = new Event({
                    eventName: course.courseTitle,
                    // owner: req.user.id,
                    owner: '629e91f497392e52c801e6ae',
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
                count += 1
            }
        })
        user.courses.push(course)
        await user.save()
        res.sendStatus(200)
    }
}

module.exports.deleteUserCourseByCode = async (req, res, next) => {
    // removes the course that belongs to the user
    // returns the courses after filtering
    const { userId, courseCode } = req.body
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