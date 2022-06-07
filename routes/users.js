const express = require('express');
const router = express.Router();
const { catchAsync } = require('../utils/catchAsync')
const { register, login, logout } = require('../controllers/users')

// we will have a isLoggedIn middleware, whenever 

router.post('/register', catchAsync(register))

// login logout is done with passport
router.post('/login', catchAsync(login))

router.post('/logout', catchAsync(logout))

module.exports = router;
