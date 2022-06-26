export const useWeekDayToInt = () => {
  const weekDayToInt = (day) => {
    const stringToInt = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    return stringToInt[day];
  };
  return [weekDayToInt];
};

export const useCourseMeetingTimeToEvent = () => {
  const courseMeetingTimeToEvent = (course, meetingTime, type) => {
    return {
      eventName: course.courseCode,
      location: meetingTime.assignedRoom1,
      type: type,
      course: course,
      day: meetingTime.day,
      startTime: meetingTime.startTime,
      endTime: meetingTime.endTime,
      duration:
        parseInt(meetingTime.endTime.slice(0, 2)) -
        parseInt(meetingTime.startTime.slice(0, 2)),
    };
  };
  return courseMeetingTimeToEvent;
};

// days: the object to parse to
// event: an event
export const useParseEventToTimetableObj = () => {
  // mutates the days object to store a parsed meetingTime
  // extract the time from a meetingTime and give warning if overlapping is detected
  const parseEventToTimetableObj = (days, event) => {
    const day = event.day;
    const start = parseInt(event.startTime.slice(0, 2)).toString();
    if (days[day][start])
      return {
        snackVariant: 'error',
        msg: `We detected a overlap between ${days[day][start].eventName} and ${event.eventName}! Timetable may not be accurate`,
      };
    days[day][start] = event;
    if (event.duration > 1) {
      for (let i = 1; i < event.duration; i++) {
        days[day][(parseInt(start) + i).toString()] = 'skip';
      }
    }
    return null;
  };
  return parseEventToTimetableObj;
};
