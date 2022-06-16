const express = require('express');
const router = express.Router();
const cors = require('cors');
const { catchAsync } = require('../utils/catchAsync')
const { register, login, logout, createNewUserEvent,
    patchUserEventById, deleteUserEventById, getUserEventById,
    getUserEventsByDate, createNewUserCourse, deleteUserCourseByCode,
    saveCourseHolder, lockCourse, saveTimeTable, newTimetable,
    getUserCourse, getLoggedIn, uploadImage, deleteImage, addNewFriend,
    getUserFriend, getUser, lockSection, deleteSection
} = require('../controllers/users')
const { isLoggedIn } = require('../controllers/middleware')
const passport = require('passport')



router.use(cors())

router.get('/', catchAsync(getUser))

/**
 * @swagger
 * 
 *  /users/register:
 *  post:
 *      summary: register a user
 *      parameters:
 *          - $ref: '#/parameters/email'
 *          - $ref: '#/parameters/first'
 *          - $ref: '#/parameters/last'
 *          - $ref: '#/parameters/university'
 *          - $ref: '#/parameters/profileImg'
 *      responses:
 *          200:
 *              description: user has successfully registered
 */
// router.post('/register', catchAsync(register))

router.post('/register', catchAsync(register));


/**
 * @swagger
 * 
 *  /users/login:
 *  post:
 *      summary: login a user
 *      parameters:
 *          - $ref: '#/parameters/email'
 *          - $ref: '#/parameters/password'
 *      responses:
 *          200:
 *              description: user has successfully logged in
 */
router.post('/login', passport.authenticate('local', {
    failureMessage: true,
}), catchAsync(login))

router.post('/getLoggedIn', catchAsync(getLoggedIn))


/**
 * @swagger
 * 
 *  /users/logout:
 *  post:
 *      summary: log out a user
 *      responses:
 *          200:
 *              description: user has successfully logged out
 */
router.post('/logout', isLoggedIn, catchAsync(logout))

/**
 * @swagger
 * /users/events:
 *  get:
 *      summary: Retreive all events owned by the current user
 *      description: Retreive all events owned by the current user in the given date range
 *      parameters:
 *          - $ref: '#/parameters/begin'
 *          - $ref: '#/parameters/end'
 *          - $ref: '#/parameters/on'
 *      responses:
 *          200:
 *              description: A list of events
 */
router.get('/events', isLoggedIn, catchAsync(getUserEventsByDate))

/**
 * @swagger
 * /users/events/new:
 *  post:
 *      summary: create a new event
 *      description: create a new event
 *      responses:
 *          200:
 *              description: A list of events
 * 
 */


router.post('/events/new', isLoggedIn, catchAsync(createNewUserEvent))

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
    .get(isLoggedIn, catchAsync(getUserEventById))
    .patch(isLoggedIn, catchAsync(patchUserEventById))
    .delete(isLoggedIn, catchAsync(deleteUserEventById))

    
router.post('/uploadImage', isLoggedIn, catchAsync(uploadImage))    

router.post('/deleteImage', isLoggedIn, catchAsync(deleteImage))

// create a new course for user
router.post('/courses/new', isLoggedIn, catchAsync(createNewUserCourse))
    
// when a use selects a course but does not manually choose a time or 
// wants to use the generator, save the course code as a placeholder first
// These courses will be replaced with meeting times when the timetable is generated

router.post('/courses/saveCourseHolder', isLoggedIn, catchAsync(saveCourseHolder))

// generate new timetables
router.post('/courses/timetable/new', isLoggedIn, catchAsync(newTimetable))

// save timetable
router.post('/courses/timetable/save', isLoggedIn, catchAsync(saveTimeTable))

// locking a course. Need to manually choose a time first
router.post('/courses/lock', isLoggedIn, catchAsync(lockCourse))

router.delete('/courses/delete', isLoggedIn, catchAsync(deleteUserCourseByCode))

router.post('/courses/lockSection', isLoggedIn, catchAsync(lockSection))

router.post('/courses/deleteSection', isLoggedIn, catchAsync(deleteSection))


// get users courses
router.get('/courses', isLoggedIn, catchAsync(getUserCourse))

// friends

router.post('/friends/new', isLoggedIn, catchAsync(addNewFriend))

router.get('/friends', isLoggedIn, catchAsync(getUserFriend))

module.exports = router;
