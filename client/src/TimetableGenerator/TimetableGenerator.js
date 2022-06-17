const { all } = require('express/lib/application');
var data = require('./courses.json'); //(with path)
// for (let course in data) {
//     var dataList = Object.values(data);
//     console.log(dataList);
// }
console.log(data['SLA100H1'].sections[0].meetingTimes);

/**
 * MEETING TIME is an object:
 * {
    "day": "Monday",
    "startTime": "10:00",
    "endTime": "12:00",
    "assignedRoom1": "",
    "assignedRoom2": null
}
 * SECTION is an object:
    {
        "sectionCode": "LEC-0101",
        "term": "F",
        "meetingTimes": [
            {
                "day": "Monday",
                "startTime": "10:00",
                "endTime": "12:00",
                "assignedRoom1": "",
                "assignedRoom2": null
            },
            {
                "day": "Wednesday",
                "startTime": "10:00",
                "endTime": "12:00",
                "assignedRoom1": "",
             =   "assignedRoom2": null
            },
        ],
        "instructors": [],
        "online": "In Person"
    }

 *  COURSE is an object  # which exclues the courseCode key!
     {
        "courseId": "65275",
        "courseTitle": "Elementary Russian I",
        ... the rest: sections, meeting times.. 
     }

 * SCHEDULE is an object, consisting of courses: 
 * {
 *  "SLA100H1": 
    * {
            "sectionCode": "LEC-0101",
            "term": "F",
            "meetingTimes": [
                {
                    "day": "Monday",
                    "startTime": "10:00",
                    "endTime": "12:00",
                    "assignedRoom1": "",
                    "assignedRoom2": null
                },
                {
                    "day": "Wednesday",
                    "startTime": "10:00",
                    "endTime": "12:00",
                    "assignedRoom1": "",
                    "assignedRoom2": null
                },
                {
                    "day": "Thursday",
                    "startTime": "10:00",
                    "endTime": "11:00",
                    "assignedRoom1": "",
                    "assignedRoom2": null
                }
            ],
            "instructors": [],
            "online": "In Person"
        },,
    'FIN100H1": section,
    'MAT137Y1": section
 * }
 */


/**
 * @name timesConflict
 * @description Returns whether the meeting times m1 and m2 conflict.
 * @param {object} m1 
 * @param {object} m2
 * m1 and m2 are "meetingTimes" arrays
 * @returns {boolean}
 */
function timesConflict(m1, m2) {
    const sameDay = m1.day === m2.day;
    const sameTime = (m1.startTime <= m2.startTime && m2.startTime < m1.endTime) || (m2.startTime <= m1.startTime && m1.startTime < m2.endTime);
    return sameDay && sameTime;
}

/**
 * @name sectionsConflict
 * @description Return whether the sections s1 and s2 conflict.
 * @param {object} s1 
 * @param {object} s2
 * m1 and m2 are "sections" arrays
 * @returns {boolean}
 */
function sectionsConflict(s1, s2) {
    sameSemester = s1.term === s2.term || s1.term === 'Y' || s2.term === 'Y';
    let timeConflict = [];
    for (let m1 of s1.meetingTimes) {
        for (let m2 of s2.meetingTimes) {
            timeConflict.push(timesConflict(m1, m2));
        }
    }
    sameMeeting = timeConflict.some(element => element === true);

    return sameSemester && sameMeeting
}

/**
 * @name isValid
 * @description Returns whether the given schedule is valid.
 * @param {object} schedule
 * @returns {boolean}
 */
function isValid(schedule) {
    let allSections = Object.values(schedule);
    let scheduleConflict = [];
    for (let section1 of allSections) {
        for (let section2 of allSections) {
            if (section1 !== section2) {
                scheduleConflict.push(!(sectionsConflict(section1, section2)));
            }
        }
    }
    return scheduleConflict.every(element => element === true);
}

/**
 * @name isSectionCompatible
 * @description Returns whether the given section is compatible with the given schedule.
 * @param {object} schedule
 * @param {object} section
 * @returns {boolean}
 */
function isSectionCompatible(schedule, section) {
    let allSections = Object.values(schedule);
    let conflicts = [];
    for (let sec in allSections) {
        conflicts.push(!(sectionsConflict(sec, section)));
    }
    return conflicts.all(element => element === true);
}

/**
 * @name filterByTerm
 * @description Returns a copy of a given course with only sections that meet in the given term.
 * @param {object} course
 * @param {string} term
 * @returns {object}
 */
function filterByTerm(course, term) {
    let courseCopy = course;
    let sectionsInTerm = [];
    for (let sec of course.sections) {
        if (sec.term === term || sec.term === 'Y') {
            sectionsInTerm.push(sec);
        }

    }
    courseCopy.sections = sectionsInTerm;
    return courseCopy;
}

/**
 * @name getValidSchedules
 * @description Returns a object of all valid schedules for the given courses and in the given term.
 * @param {object} courseData data of all courses: data = require('./courses.json');
 * @param {object} courses an array of course codes ['CSC111H1', 'MAT137Y1, ...]
 * @param {string} term
 * @returns {object} [{schedule1}, {schedule2}, ...]
 */
function getValidSchedules(courseData, courses, term) {
    listOfCourses = []
    for (let i = 1; i <= courses.length; i++) {
        eval('var ' + 'c' + i + ' = ' + `${filterByTerm(courseData[courses[i - 1]], term)};`);
        listOfCourses.push(eval('c' + i));
    }
    return validCourseSchedules(listOfCourses.values())
}