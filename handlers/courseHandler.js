const User = require('../models/user');
const { Course } = require('../models/course');

module.exports = (io) => {
  const addUserCourse = async function (course) {
    const socket = this;
    const user = await User.findById(socket.userId);
    user.courses = user.courses.filter(
      (c) => c.courseCode !== course.courseCode
    );
    user.courses.push(course);
    // await user.save();
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

  const makeTimeTable = async function (courseCodes) {
    const socket = this;
    const courses = await Course.find({
      courseCode: {
        $in: courseCodes,
      },
    });
    // console.log(getValidSchedules(courses, true));
    // console.log(getValidSchedules(courseCodes, true));
    // socket.emit('get timetable', getValidSchedules(courseCodes, true));
  };

  // helper functions for generateCourse
  // DOES NOT WORK
  // const getPossibleSchedules = (
  //   listOfCourses,
  //   onlyLectures = true,
  //   lockedCourses = []
  // ) => {
  //   //recursive function for both lectures and tutorials
  //   const recursiveFunction = (data, acc) => {
  //     if (!data.length) {
  //       // if listOfCourses is falsy
  //       return acc;
  //     }
  //     const [next, ...rest] = data;

  //     if (acc.length === 0) {
  //       return recursiveFunction(rest, next);
  //     }

  //     return recursiveFunction(
  //       rest,
  //       next.flatMap((n) => acc.flatMap((a) => Object.assign({}, a, n)))
  //     );
  //   };

  //   // if lectures and tutorials are included:
  //   if (!onlyLectures) {
  //     const courseCombo = listOfCourses.map(({ courseCode, possibleCombos }) =>
  //       possibleCombos.map((c) => ({
  //         [courseCode]: c,
  //       }))
  //     );
  //     return recursiveFunction(courseCombo, []);
  //   }

  //   // if want to generate courses with only one lecture
  //   if (onlyLectures) {
  //     const courseCombo = listOfCourses.map(({ courseCode, sections }) =>
  //       sections.map((lec) => ({
  //         [courseCode]: lec,
  //       }))
  //     );
  //     return recursiveFunction(courseCombo, []);
  //   }
  // };

  // const getValidSchedules = (
  //   listOfCourses,
  //   onlyLectures = true,
  //   lockedCourses = []
  // ) => {
  //   //listOfCourses is an array with cleaned course data
  //   const allPossibleSchedules = getPossibleSchedules(
  //     listOfCourses,
  //     onlyLectures,
  //     lockedCourses
  //   );
  //   return allPossibleSchedules.filter((schedule) =>
  //     isValid(schedule, onlyLectures)
  //   );
  // };

  // const isValid = (schedule, onlyLectures) => {
  //   //sections are the same as combos.[lectureSection, tut]
  //   let allSections = Object.values(schedule);
  //   for (const s1 of allSections) {
  //     for (const s2 of allSections) {
  //       if (s1 !== s2) {
  //         if (sections_conflict(s1, s2, onlyLectures)) {
  //           return false; // return false since there is a conflict
  //         }
  //       }
  //     }
  //   }
  //   return true;
  // };

  // const sections_conflict = (s1, s2, onlyLectures) => {
  //   //if tutorials are included
  //   if (!onlyLectures) {
  //     let sameSemester =
  //       s1[0]['term'] === s2[0]['term'] ||
  //       s1[0]['term'] === 'Y' ||
  //       s2[0]['term'] === 'Y';
  //     const sameMeeting = () => {
  //       let s1MeetingTimes = [...s1[0]['meetingTimes']];
  //       //s1MeetingTimes.push(...s1[0]['meetingTimes'])
  //       s1MeetingTimes.push(...s1[1]['meetingTimes']);

  //       let s2MeetingTimes = [...s2[0]['meetingTimes']];
  //       //s2MeetingTimes.push(...s2[0]['meetingTimes'])
  //       s2MeetingTimes.push(...s2[1]['meetingTimes']);

  //       for (const s1meetingTime of s1MeetingTimes) {
  //         for (const s2meetingTime of s2MeetingTimes) {
  //           let m1 = convertToDateArray(s1meetingTime);
  //           let m2 = convertToDateArray(s2meetingTime);
  //           if (times_conflict(m1, m2)) {
  //             return true;
  //           }
  //         }
  //       }
  //       return false;
  //     };
  //     return sameSemester && sameMeeting();
  //   }

  //   if (onlyLectures) {
  //     let sameSemester =
  //       s1['term'] === s2['term'] || s1['term'] === 'Y' || s2['term'] === 'Y';
  //     const sameMeeting = () => {
  //       for (const s1meetingTime of s1['meetingTimes']) {
  //         for (const s2meetingTime of s2['meetingTimes']) {
  //           let m1 = convertToDateArray(s1meetingTime);
  //           let m2 = convertToDateArray(s2meetingTime);
  //           if (times_conflict(m1, m2)) {
  //             return true;
  //           }
  //         }
  //       }
  //       return false;
  //     };
  //     return sameSemester && sameMeeting();
  //   }
  // };

  return {
    getUserCourse,
    addUserCourse,
    lockUserCourse,
    deleteUserCourse,
    lockCourseSection,
    deleteCourseSection,
    makeTimeTable,
  };
};
