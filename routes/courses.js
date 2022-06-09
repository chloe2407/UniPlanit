const express = require('express')
const router = express.Router()
const { catchAsync } = require('../utils/catchAsync')
const { getCourse } = require('../controllers/courses')

// handles course CRUD

router.get('/', catchAsync(getCourse))

module.exports = router