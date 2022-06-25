const mongoose = require('mongoose');
const { courseOneSectionSchema } = require('../models/course');

module.exports.timetableSchema = new mongoose.Schema({
  timetable: {
    type: [courseOneSectionSchema],
  },
});
