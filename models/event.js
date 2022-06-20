const mongoose = require('mongoose');
const { toLocal } = require('../utils/time');
const { courseOneSectionSchema } = require('../models/course');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: String,
    default: 'N/A',
  },
  type: {
    type: String,
    lowercase: true,
    enum: ['personal', 'lecture', 'tutorial'],
  },
  // course with a specified section/tutorial
  // only allow one section and tutorial
  course: courseOneSectionSchema,
  // all dates are stored in UTC-0
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  // repeat interval is given in milliseconds
  repeat: {
    // in ms
    repeatInterval: {
      type: Number,
      requried: true,
    },
    startDate: {
      type: Date,
      default: new Date(),
      requried: true,
    },
    endDate: {
      type: Date,
      default: new Date(),
      required: true,
    },
  },
  description: String,
});

// instead of returning time in UTC 0, we calibrate to current
// timezone before returning to user
eventSchema.virtual('startLocal').get(function () {
  console.log(this.start);
  return toLocal(this.start);
});

eventSchema.virtual('endLocal').get(function () {
  return toLocal(this.start);
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
