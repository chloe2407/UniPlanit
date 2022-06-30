const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
  },
  courseTitle: String,
  // requried for identifying courses between multiple unis
  university: {
    type: String,
    lowercase: true,
    enum: ['uoft'],
  },
  term: {
    type: String,
    enum: ['F', 'S', 'Y'],
    required: true,
  },
  sections: [
    {
      sectionCode: {
        type: String,
        required: true,
      },
      term: {
        type: String,
        uppercase: true,
        enum: ['F', 'S', 'Y'],
        required: true,
      },
      instructors: [],
      meetingTimes: [
        {
          day: {
            type: String,
            enum: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
              'error',
            ],
          },
          startTime: {
            type: String,
            required: true,
          },
          endTime: {
            type: String,
            required: true,
          },
          assignedRoom1: String,
        },
      ],
    },
  ],
  tutorials: [
    {
      tutorialCode: String,
      term: {
        type: String,
        uppercase: true,
        enum: ['F', 'S', 'Y'],
        required: true,
      },
      instructors: [],
      meetingTimes: [
        {
          day: {
            type: String,
            enum: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
              'error',
            ],
          },
          startTime: {
            type: String,
            required: true,
          },
          endTime: {
            type: String,
            required: true,
          },
          assignedRoom1: String,
        },
      ],
    },
  ],
});

module.exports.courseOneSectionSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    lowercase: true,
    enum: ['uoft'],
  },
  term: {
    type: String,
    enum: ['F', 'S', 'Y'],
    required: true,
  },
  section: {
    type: {
      isLocked: {
        type: Boolean,
        default: false,
        required: true,
      },
      sectionCode: {
        type: String,
        required: true,
      },
      term: {
        type: String,
        uppercase: true,
        enum: ['F', 'S', 'Y'],
        required: true,
      },
      instructors: {
        type: [],
        default: undefined,
      },
      meetingTimes: {
        type: [
          {
            day: {
              type: String,
              enum: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
                'error',
              ],
            },
            startTime: {
              type: String,
              required: true,
            },
            endTime: {
              type: String,
              required: true,
            },
            assignedRoom1: String,
          },
        ],
        default: undefined,
      },
    },
    default: undefined,
  },
  tutorial: {
    type: {
      isLocked: {
        type: Boolean,
        default: false,
        required: true,
      },
      tutorialCode: {
        type: String,
        required: true,
      },
      term: {
        type: String,
        uppercase: true,
        enum: ['F', 'S', 'Y'],
        required: true,
      },
      instructors: {
        type: [],
        default: undefined,
      },
      meetingTimes: {
        type: [
          {
            day: {
              type: String,
              enum: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
                'error',
              ],
            },
            startTime: {
              type: String,
              required: true,
            },
            endTime: {
              type: String,
              required: true,
            },
            assignedRoom1: String,
          },
        ],
        default: undefined,
      },
    },
    default: undefined,
  },
});

module.exports.courseSchema = courseSchema;
module.exports.Course = mongoose.model('Course', courseSchema);
