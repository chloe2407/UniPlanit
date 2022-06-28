const User = require('../models/user');

module.exports = (io) => {
  const addUserCourse = async function (course) {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      user.courses = user.courses.filter(
        (c) => c.courseCode !== course.courseCode
      );
      user.courses.push(course);
      await user.save();
      io.to(socket.userId).emit('get user course', user.courses);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const getUserCourse = async function () {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      io.to(socket.userId).emit('get user course', user.courses);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const deleteUserCourse = async function (courseCode) {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      user.courses = user.courses.filter(
        (course) => course.courseCode !== courseCode
      );
      await user.save();
      io.to(socket.userId).emit('get user course', user.courses);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const getFavTimetable = async function () {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      io.to(socket.userId).emit('get fav timetable', user.savedTimetables);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const addFavTimetable = async function (tb) {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      user.savedTimetables.push(tb);
      await user.save();
      io.to(socket.userId).emit('get fav timetable', user.savedTimetables);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const deleteFavTimetable = async function (favTimetable) {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      user.savedTimetables = favTimetable;
      await user.save();
      io.to(socket.userId).emit('get fav timetable', user.savedTimetables);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const deleteCourseSection = async function (courseCode, type) {
    const socket = this;
    const user = await User.findById(socket.userId);
    try {
      const course = user.courses.filter((c) => c.courseCode === courseCode)[0];
      if (type === 'section') {
        course.section = undefined;
      } else {
        course.tutorial = undefined;
      }
      await user.save();
      io.to(socket.userId).emit('get user course', user.courses);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const getBuildTimetable = async function () {
    // returns the current work-in-progress timetable
    socket = this;
    try {
      const user = await User.findById(socket.userId);
      io.to(socket.userId).emit('get build timetable', user.currentTimetable);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const buildTimetable = async function (userCourse) {
    socket = this;
    try {
      const user = await User.findById(socket.userId);
      if (userCourse && userCourse.length > 0) {
        user.currentTimetable = userCourse.map((c) => {
          delete c.tutorials;
          delete c.lectures;
          return c;
        });
        await user.save();
      }
      io.to(socket.userId).emit('get build timetable', user.currentTimetable);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const updateTimetable = async function (course, clear) {
    socket = this;
    try {
      const user = await User.findById(socket.userId);
      if (clear) {
        user.currentTimetable = user.currentTimetable.map((c) => {
          c.section = null;
          c.tutorial = null;
          return c;
        }, user.currentTimetable);
      } else {
        let index;
        for (let i = 0; i <= user.currentTimetable.length; i++) {
          if (user.currentTimetable[i].courseCode === course.courseCode) {
            index = i;
            break;
          }
        }
        user.currentTimetable[index] = course;
      }
      await user.save();
      io.to(socket.userId).emit('update timetable', user.currentTimetable);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const getGeneratedTimetable = async function () {
    const socket = this;
    // limit to 10 time tables to send back at once
    try {
      const user = await User.findById(socket.userId);
      console.log(user.generatedTimetables);
      io.to(socket.userId).emit(
        'get generated timetable',
        user.generatedTimetables
      );
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const generateTimetable = async function (userCourse) {
    const socket = this;
    const start = Date.now();
    try {
      const user = await User.findById(socket.userId);
      const validSchedules = getValidSchedules(userCourse, true);
      const end = Date.now();
      user.generatedTimetables = validSchedules;
      await user.save();
      console.log(user.generatedTimetables);
      io.to(socket.userId).emit(
        'get generated timetable',
        user.generatedTimetables
      );
      io.to(socket.userId).emit('time elpased', (end - start) / 1000);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  function getPossibleSchedules(
    listOfCourses,
    onlyLectures = true,
    lockedCourses = []
  ) {
    //recursive function for both lectures and tutorials
    const recursiveFunction = (data, acc) => {
      if (!data.length) {
        // if listOfCourses is falsy
        return acc;
      }
      const [next, ...rest] = data;

      if (acc.length === 0) {
        return recursiveFunction(rest, next);
      }

      return recursiveFunction(
        rest,
        next.flatMap((n) => acc.flatMap((a) => Object.assign({}, a, n)))
      );
    };

    // if lectures and tutorials are included:
    if (!onlyLectures) {
      const courseCombo = listOfCourses.map(({ courseCode, possibleCombos }) =>
        possibleCombos.map((c) => ({
          [courseCode]: c,
        }))
      );
      return recursiveFunction(courseCombo, []);
    }

    // if want to generate courses with only one lecture
    if (onlyLectures) {
      const courseCombo = listOfCourses.map(
        ({ courseCode, courseTitle, term, sections }) => {
          return sections.map((lec) => {
            cloneLec = JSON.parse(JSON.stringify(lec));
            cloneLec['isLocked'] = false;
            return {
              [courseCode]: {
                courseCode: courseCode,
                courseTitle: courseTitle,
                term: term,
                isLocked: false,
                section: cloneLec,
              },
            };
          });
        }
      );
      return recursiveFunction(courseCombo, []);
    }
  }

  function getValidSchedules(
    listOfCourses,
    onlyLectures = true,
    lockedCourses = []
  ) {
    //listOfCourses is an array with cleaned course data
    const allPossibleSchedules = getPossibleSchedules(
      listOfCourses,
      onlyLectures,
      lockedCourses
    );
    const allValidSchedules = allPossibleSchedules.filter((schedule) =>
      isValid(schedule, onlyLectures)
    );
    return allValidSchedules.map((schedule) => Object.values(schedule));
  }

  function isValid(schedule, onlyLectures) {
    //sections are the same as combos.[lectureSection, tut]
    let allSections = Object.values(schedule).map((course) => course.section);
    // console.log(allSections);
    for (const s1 of allSections) {
      for (const s2 of allSections) {
        if (s1 !== s2) {
          if (sections_conflict(s1, s2, onlyLectures)) {
            return false; // return false since there is a conflict
          }
        }
      }
    }
    return true;
  }

  function sections_conflict(s1, s2, onlyLectures) {
    //if tutorials are included
    if (!onlyLectures) {
      let sameSemester =
        s1[0]['term'] === s2[0]['term'] ||
        s1[0]['term'] === 'Y' ||
        s2[0]['term'] === 'Y';
      const sameMeeting = () => {
        let s1MeetingTimes = [...s1[0]['meetingTimes']];
        //s1MeetingTimes.push(...s1[0]['meetingTimes'])
        s1MeetingTimes.push(...s1[1]['meetingTimes']);

        let s2MeetingTimes = [...s2[0]['meetingTimes']];
        //s2MeetingTimes.push(...s2[0]['meetingTimes'])
        s2MeetingTimes.push(...s2[1]['meetingTimes']);

        for (const s1meetingTime of s1MeetingTimes) {
          for (const s2meetingTime of s2MeetingTimes) {
            let m1 = convertToDateArray(s1meetingTime);
            let m2 = convertToDateArray(s2meetingTime);
            if (times_conflict(m1, m2)) {
              return true;
            }
          }
        }
        return false;
      };
      return sameSemester && sameMeeting();
    }

    if (onlyLectures) {
      let sameSemester =
        s1['term'] === s2['term'] || s1['term'] === 'Y' || s2['term'] === 'Y';
      const sameMeeting = () => {
        for (const s1meetingTime of s1['meetingTimes']) {
          for (const s2meetingTime of s2['meetingTimes']) {
            let m1 = convertToDateArray(s1meetingTime);
            let m2 = convertToDateArray(s2meetingTime);
            if (times_conflict(m1, m2)) {
              return true;
            }
          }
        }
        return false;
      };
      return sameSemester && sameMeeting();
    }
  }

  function times_conflict(m1, m2) {
    //m1, m2 are ['day', startTime, endTime]
    if (m1[0] === 'error' || m2[0] === 'error') {
      //asynch classes will never conflict
      return false;
    }
    let sameDay = m1[0] === m2[0];
    let same_time =
      (m1[1] <= m2[1] && m2[1] < m1[2]) || (m2[1] <= m1[1] && m1[1] < m2[2]);
    return sameDay && same_time;
  }

  function convertToDateArray(meetingTimeDict) {
    //convert into m1, m2 format

    //check for asynch classes
    if (meetingTimeDict['day'] !== 'error') {
      startTime = new Date();
      startTime.setHours(parseInt(meetingTimeDict['startTime']));
      endTime = new Date();
      endTime.setHours(parseInt(meetingTimeDict['endTime']));
      //return [meetingTimeDict['day'], startTime, endTime]
      return [
        meetingTimeDict['day'],
        parseInt(meetingTimeDict['startTime']),
        parseInt(meetingTimeDict['endTime']),
      ];
    } else {
      return [meetingTimeDict['day'], null, null];
    }
  }

  return {
    getUserCourse,
    addUserCourse,
    deleteUserCourse,
    addFavTimetable,
    getFavTimetable,
    deleteFavTimetable,
    deleteCourseSection,
    getGeneratedTimetable,
    updateTimetable,
    buildTimetable,
    getBuildTimetable,
    generateTimetable,
  };
};
