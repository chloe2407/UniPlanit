const User = require('../models/user');

module.exports = (io) => {
  const addUserCourse = async function (course, term) {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      if (
        !user.courses.some(
          (c) => c.courseCode === course.courseCode && c.term === course.term
        )
      ) {
        user.courses.push(course);
      }
      await user.save();
      // console.log(user.courses)
      // console.log(term)
      const filteredCourses = getFilteredCoursesByTerm(user.courses, term);
      // console.log(filteredCourses);
      io.to(socket.userId).emit('get user course', filteredCourses);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getUserCourse = async function (term) {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      const filteredCourses = getFilteredCoursesByTerm(user.courses, term);
      io.to(socket.userId).emit('get user course', filteredCourses);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const deleteUserCourse = async function (courseCode, courseTerm, term) {
    const socket = this;
    // console.log(courseTerm);
    // console.log(term);
    try {
      const user = await User.findById(socket.userId);
      user.courses = user.courses.filter(
        (course) =>
          course.courseCode !== courseCode || course.term !== courseTerm
      );
      await user.save();
      // console.log(user.courses)
      const filteredCourses = getFilteredCoursesByTerm(user.courses, term);
      // console.log(filteredCourses);
      io.to(socket.userId).emit('get user course', filteredCourses);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getFavTimetable = async function () {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      io.to(socket.userId).emit('get fav timetable', user.favoritedTimetables);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const addFavTimetable = async function (tb) {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      // console.log(tb);
      tb.isSaved = true;
      user.favoritedTimetables.push(tb);
      await user.save();
      io.to(socket.userId).emit('get fav timetable', user.favoritedTimetables);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const deleteFavTimetable = async function (favTimetable) {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      user.favoritedTimetables = favTimetable;
      await user.save();
      io.to(socket.userId).emit('get fav timetable', user.favoritedTimetables);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const updateFavTimetable = async function (timetable) {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      for (let i = 0; i < user.favoritedTimetables.length; i++) {
        if (user.favoritedTimetables[i]._id == timetable._id) {
          user.favoritedTimetables[i] = timetable;
          break;
        }
      }
      await user.save();
      io.to(socket.userId).emit('get fav timetable', user.favoritedTimetables);
    } catch (e) {
      throw new Error(e.message);
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
      throw new Error(e.message);
    }
  };

  const updateSelectedTimetable = async function (timetable, clear) {
    socket = this;
    try {
      const user = await User.findById(socket.userId);
      if (clear) {
        // clear the timetable
        user.selectedTimetable.timetable = user.selectedTimetable.timetable.map(
          (c) => {
            c.section = null;
            c.tutorial = null;
            return c;
          }
        );
      } else {
        user.selectedTimetable = timetable;
      }
      await user.save();
      io.to(socket.userId).emit(
        'update selected timetable',
        user.selectedTimetable
      );
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getGeneratedTimetable = async function () {
    const socket = this;
    // limit to 10 time tables to send back at once
    try {
      const user = await User.findById(socket.userId);
      io.to(socket.userId).emit(
        'get generated timetable',
        user.lastGeneratedTimetables
      );
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const filterSectionByTime = (courses, timeFilter) => {
    const filteredCourses = [];
    for (const course of courses) {
      // only keep the sections which the meeting times match the time filter
      const filtered = JSON.parse(JSON.stringify(course));
      filtered.sections = course.sections.filter((s) => {
        return !s.meetingTimes.some(
          (m) =>
            parseInt(m.startTime) <= timeFilter[0] ||
            parseInt(m.endTime) >= timeFilter[1]
        );
      });
      filteredCourses.push(filtered);
    }
    return filteredCourses;
  };

  const generateTimetable = async function (term, timeFilter) {
    // console.log(timeFilter);
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      const courses = getFilteredCoursesByTerm(user.courses, term);
      const originalLength = courses.length;
      // put the courses through a filter to filter out the times
      const filteredCourses = filterSectionByTime(courses, timeFilter);
      const filteredLength = courses.length;
      if (originalLength > filteredLength) {
        io.to(socket.userId).emit('get generated timetable', null, null);
      }
      const start = Date.now();
      const validSchedules = getValidSchedules(filteredCourses, true);
      // console.log(validSchedules.length);
      const end = Date.now();
      user.lastGeneratedTimetables = validSchedules.map((timetable) => {
        return {
          term: term,
          timetable: timetable,
        };
      });
      // console.log(user.lastGeneratedTimetables[0].timetable);
      await user.save();
      io.to(socket.userId).emit(
        'get generated timetable',
        user.lastGeneratedTimetables,
        (end - start) / 1000
      );
    } catch (e) {
      console.log('An error has occured');
      throw new Error(e.message);
    }
  };

  return {
    getUserCourse,
    addUserCourse,
    deleteUserCourse,
    addFavTimetable,
    getFavTimetable,
    deleteFavTimetable,
    deleteCourseSection,
    getGeneratedTimetable,
    updateSelectedTimetable,
    generateTimetable,
    updateFavTimetable,
  };
};

const getFilteredCoursesByTerm = (courses, term) => {
  return courses.filter((c) => c.term === term || c.term === 'Y');
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
      ({ courseCode, courseTitle, term, sections, university }) => {
        return sections.map((lec) => {
          cloneLec = JSON.parse(JSON.stringify(lec));
          cloneLec['isLocked'] = false;
          return {
            [courseCode]: {
              courseCode: courseCode,
              courseTitle: courseTitle,
              university: university,
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
