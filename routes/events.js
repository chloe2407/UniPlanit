const express = require('express')
const router = express.Router()
const { catchAsync } = require('../utils/catchAsync')
const { getEventById, patchEventById, deleteEventById, newEvent } = require('../controllers/events')

// middleware needed
// user authentication

router.route('/:eventId')
    .get(catchAsync(getEventById))
    .patch(catchAsync(patchEventById))
    .delete(catchAsync(deleteEventById))

router.post('/new', catchAsync(newEvent))

module.exports = router