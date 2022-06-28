const mongoose = require('mongoose');
const { courseOneSectionSchema } = require('../models/course');

const timetableSchema = new mongoose.Schema({
  timetable: {
    type: [courseOneSectionSchema],
  },
});

const Timetable = mongoose.model('Timetable', timetableSchema);
module.exports = {
  timetableSchema,
  Timetable,
};
