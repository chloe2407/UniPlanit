const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { courseSchema, courseOneSectionSchema } = require('./course');
const { timetableSchema } = require('./timetable');
// need to set up cloudinary for user profile img

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    requried: true,
    unique: true,
  },
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  courses: [courseSchema],
  currentTimetable: [courseOneSectionSchema],
  savedTimetables: {
    type: [[courseOneSectionSchema]],
  },
  generatedTimetables: {
    type: [[courseOneSectionSchema]],
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  university: {
    type: String,
    lowercase: true,
    // add more university here
    enum: ['University of Toronto, St. George'],
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  // path to cloud server
  profileImg: {
    type: String,
  },
  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// passport set up here
userSchema.plugin(passportLocalMongoose);

userSchema.virtual('fullName').get(function () {
  return `${this.first} ${this.last}`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
