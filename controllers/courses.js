const { Course } = require('../models/course');

module.exports.getCourse = async (req, res, next) => {
  // get course by courseCode and title
  // req.body should have
  const {
    // other filters
    courseCode,
    courseTitle,
    university,
    term,
  } = req.body;
  const foundCourses = await Course.find({
    $and: [
      {
        courseCode: {
          $regex: courseCode ? courseCode.toUpperCase() : '',
        },
      },
      {
        courseTitle: {
          $regex: courseTitle ? courseTitle : '',
        },
      },
      {
        university: {
          $eq: university.toLowerCase(),
        },
      },
      {
        term: {
          $eq: term,
        },
      },
    ],
  }).limit(5);
  res.json(foundCourses);
};

module.exports.generateCourse = async (req, res, next) => {
  const listOfCourses = req.body.listOfCourses;

  const validSchedules = getValidSchedules(listOfCourses, true);
  return validSchedules;
};

// helper functions for generateCourse

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
    const courseCombo = listOfCourses.map(({ courseCode, sections }) =>
      sections.map((lec) => ({
        [courseCode]: lec,
      }))
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
  return allPossibleSchedules.filter((schedule) =>
    isValid(schedule, onlyLectures)
  );
}

function isValid(schedule, onlyLectures) {
  //sections are the same as combos.[lectureSection, tut]
  let allSections = Object.values(schedule);
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
