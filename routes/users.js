const express = require('express');
const router = express.Router();
const { catchAsync } = require('../utils/catchAsync')
const { register, login, logout, createNewUserEvent,
        patchUserEventById, deleteUserEventById, getUserEventById,
        getUserEvents, createNewUserCourse
} = require('../controllers/users')

// we will have a isLoggedIn middleware, whenever 

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

// when a user saves a course this route saves the selected course sections


router.post('/courses/new', catchAsync(createNewUserCourse))


// friends
router.post('/friends/new')

module.exports = router;
