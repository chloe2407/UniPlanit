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

export const useCourseToEvent = () => {
  const courseToEvent = (course, meetingTime) => {
    return {
      eventName: course.courseCode,
      location: meetingTime.assignedRoom1,
      type: 'lecture',
      course: course,
      day: meetingTime.day,
      start: meetingTime.startTime,
      end: meetingTime.endTime,
    };
  };
  return [courseToEvent];
};
