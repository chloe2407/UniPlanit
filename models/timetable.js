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
  },
  description: {
    type: String,
  },
  tags: {
    type: String,
  },
});

module.exports = {
  timetableSchema,
};
