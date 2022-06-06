// setting up back end for testing CRUD with fake data
const { calibrateTimeToUTC } = require('../utils/time')
const Event = require('../models/event')

module.exports.getEventById = async (req, res, next) => {
    // get information about specific event by event Id
    const { eventId } = req.params
    const event = await Event.findById(eventId)
    res.json(event)
}

module.exports.patchEventById = async (req, res, next) => {
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

module.exports.deleteEventById = async (req, res, next) => {
    // delete by id
    const { eventId } = req.params
    const result = await Event.findOneAndDelete(eventId)
    console.log(result)
    res.sendStatus(200)
}

module.exports.newEvent = async ( req, res, next) => {
    console.log(req.body)
    const event = new Event(req.body)
    // some configurations for the new event
    // not sure how to account for daylight saving??
    // the events made here won't have a pointer to a course
    event.start = calibrateTimeToUTC(new Date(req.body.start))
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