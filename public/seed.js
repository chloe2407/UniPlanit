const mongoose = require('mongoose');
const fs = require('fs/promises');
const { Course } = require('../models/course');
const User = require('../models/user');
const Message = require('../models/message');

require('dotenv').config({
  path: '../.env',
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Mongo connection open'))
  .catch((err) => console.error(err));

const deleteAll = async () => {
  await Course.deleteMany();
};

const seed = () => {
  fs.readFile('courses.json', 'utf-8')
    .then((data) => {
      const parsedData = JSON.parse(data);
      for (let [key, value] of Object.entries(parsedData)) {
        const course = new Course({
          courseCode: value.courseCode,
          courseTitle: value.courseTitle,
          university: 'uoft',
          term: value.term,
        });
        value.sections = value.sections.filter(
          (section) =>
            !section.meetingTimes.some(
              (meetingTime) => meetingTime.startTime === null
            )
        );
        value.tutorials = value.tutorials.filter((tutorial) => {
          !tutorial.meetingTimes.some(
            (meetingTime) => meetingTime.startTime === null
          );
        });
        course.sections = value.sections;
        course.tutorials = value.tutorials;
        course.save();
      }
    })
    .catch((err) => console.log(err));
};
