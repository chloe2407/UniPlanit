const User = require('../models/user');
module.exports = (io) => {
  const addUserCourse = async function (course) {
    const socket = this;
    const user = await User.findById(socket.userId);
    user.courses = user.courses.filter(
      (c) => c.courseCode !== course.courseCode
    );
    user.courses.push(course);
    // await user.save();
    console.log(user.courses);
    await user.save();
    io.to(socket.userId).emit('get user course', user.courses);
  };

  const getUserCourse = async function () {
    const socket = this;
    const user = await User.findById(socket.userId);
    io.to(socket.userId).emit('get user course', user.courses);
  };

  const lockUserCourse = async function (courseCode) {
    const socket = this;
    const user = await User.findById(socket.userId);
    user.courses.forEach((c) => {
      if (c.courseCode === courseCode) {
        c.isLocked = !c.isLocked;
        if (c.tutorial) c.tutorial.isLocked = true;
        if (c.section) c.section.isLocked = true;
      }
    });
    await user.save();
    io.to(socket.userId).emit('get user course', user.courses);
  };

  const deleteUserCourse = async function (courseCode) {
    const socket = this;
    const user = await User.findById(socket.userId);
    user.courses = user.courses.filter(
      (course) => course.courseCode !== courseCode
    );
    await user.save();
    io.to(socket.userId).emit('get user course', user.courses);
  };

  const lockCourseSection = async function (courseCode, type) {
    const socket = this;
    const user = await User.findById(socket.userId);
    const course = user.courses.filter((c) => c.courseCode === courseCode)[0];
    if (course.isLocked) {
      return res.send({
        error: 'Cannot lock/unlock section when course is locked!',
      });
    } else if (type === 'section') {
      course.section.isLocked = !course.section.isLocked;
    } else {
      course.tutorial.isLocked = !course.tutorial.isLocked;
    }
    await user.save();
    io.to(socket.userId).emit('get user course', user.courses);
  };

  const deleteCourseSection = async function (courseCode, type) {
    const socket = this;
    const user = await User.findById(socket.userId);
    const course = user.courses.filter((c) => c.courseCode === courseCode)[0];
    if (type === 'section') {
      course.section = undefined;
    } else {
      course.tutorial = undefined;
    }
    await user.save();
    io.to(socket.userId).emit('get user course', user.courses);
  };

  return {
    getUserCourse,
    addUserCourse,
    lockUserCourse,
    deleteUserCourse,
    lockCourseSection,
    deleteCourseSection,
  };
};
