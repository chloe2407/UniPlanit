const express = require('express');
const router = express.Router();
const { catchAsync } = require('../utils/catchAsync')
const { register, login, logout, createNewUserEvent,
        patchUserEventById, deleteUserEventById, getUserEventById,
        getUserEvents, createNewUserCourse, deleteUserCourseByCode,
        saveCourseHolder, lockCourse, saveTimeTable, newTimetable,
        getUserCourse
} = require('../controllers/users')

/**
 * @swagger
 * /user/register
 *  post:
 *      summary: register a user
 *      description: register a user then redirect to the orginal page
 *      
 */
router.post('/register', catchAsync(register))

// login logout is done with passport
router.post('/login', catchAsync(login))

router.post('/logout', catchAsync(logout))

/**
 * @swagger
 * /users/events:
 *  get:
 *      summary: Retreive all events owned by the current user
 *      description: Retreive all events owned by the current user in the given date range
 *      responses:
 *          200:
 *              description: A list of events
 */

// get all events owned by user
router.get('/events', catchAsync(getUserEvents))

/**
 * @swagger
 * /users/events/new:
 *  post:
 *      summary: create a new event
 *      description: create a new event
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                          
 *                      properties:
 *                          eventName:
 *                              type: string
 * 
 *      responses:
 *          200:
 *              description: A list of events
 * 
 */


router.post('/events/new', catchAsync(createNewUserEvent))

/**
 * @swagger
 * /users/events/{eventId}:
 *  get:
 *      summary: Get an event by Id
 *      description: Retreive an event by Id
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *      responses:
 *          200:
 *              A event
 * 
 */

router.route('/events/:eventId')
    .get(catchAsync(getUserEventById))
    .patch(catchAsync(patchUserEventById))
    .delete(catchAsync(deleteUserEventById))

// create a new course for user
router.post('/courses/new', catchAsync(createNewUserCourse))

// when a use selects a course but does not manually choose a time or 
// wants to use the generator, save the course code as a placeholder first
// These courses will be replaced with meeting times when the timetable is generated
router.post('/courses/saveCourseHolder', catchAsync(saveCourseHolder))

// generate new timetables
router.post('/courses/timetable/new', catchAsync(newTimetable))

// save timetable
router.post('/courses/timetable/save', catchAsync(saveTimeTable))

// locking a course. Need to manually choose a time first
router.post('/courses/lockCourse', catchAsync(lockCourse))

router.delete('/courses/delete', catchAsync(deleteUserCourseByCode))

// get users courses
router.get('/courses', catchAsync(getUserCourse))

// friends
router.post('/friends/new')

module.exports = router;
