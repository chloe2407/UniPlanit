const mongoose = require('mongoose');
const { courseOneSectionSchema } = require('../models/course');

const timetableSchema = new mongoose.Schema({
  timetable: {
    type: [courseOneSectionSchema],
    required: true,
  },
  term: {
    type: String,
    enum: ['F', 'S'],
    required: true,
  },
  name: {
    type: String,
    default: 'Untitled',
  },
  description: {
    type: String,
  },
  tags: {
    type: String,
  },
  isSaved: {
    type: Boolean,
    default: false,
  },
});

module.exports = {
  timetableSchema,
};
