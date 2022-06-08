const User = require('../models/user')
const Event = require('../models/event')
const { calibrateTimeToUTC, getDate, dayToMs } = require('../utils/time')

module.exports.register = async (req, res, next) => {
    const user = new User(req.body)
    const { password } = req.body
    // register user with passport js
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
    // new Date gives time in UTC
    event.start = new Date(req.body.start)
    event.end = calibrateTimeToUTC(new Date(req.body.end))
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
    // const userId = req.user.id
    // for testing, using req.body
    // course complies to courseOneSectionSchema
    const { userId, course } = req.body
    const user = await User.findById(userId)
    // need an event for each meeting time for lecture and tutorial
    course.section.meetingTime.map(m => {
        const date = new Date()
        const event = new Event({
            eventName: course.courseTitle,
            // owner: req.user.id,
            location: m.assignedRoom1,
            type: 'lecture',
            course: course,
            // start: getDate(date, m.day, m.startTime),
            // end: getDate(date, m.day, m.endTime),
            start: new Date(),
            end: new Date(),
            repeat: dayToMs(7)
        })
        console.log(event)
    })
    user.courses.push(course)
    user.save()
    res.sendStatus(200)
}

module.exports.deleteUserCourseByCode = async (req, res, next) => {
    const { userId, courseCode } = req.body
    const user = await User.findById(userId)
    user.courses.filter(course => course.courseCode !== courseCode)
    user.save()
    res.sendStatus(200)
}