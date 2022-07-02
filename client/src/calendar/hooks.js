export const useCourseMeetingTimeToEvent = () => {
  const courseMeetingTimeToEvent = (course, meetingTime, type) => {
    return {
      owner: course.owner && [course.owner],
      ownerInitial: course.ownerInitial && [course.ownerInitial],
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

  // if an event exists with the same courseCode and section, add the owner to that event

  const parseEventToTimetableObj = (days, event) => {
    const day = event.day;
    const start = parseInt(event.startTime.slice(0, 2)).toString();
    // someone already has this course
    // console.log(event)
    if (
      days[day][start] &&
      days[day][start].course.section.sectionCode ===
        event.course.section.sectionCode
    ) {
      if (!days[day][start].owner.includes(event.owner[0])) {
        days[day][start].owner.push(event.owner[0]);
        days[day][start].ownerInitial.push(event.ownerInitial[0]);
      }
    } else if (days[day][start])
      // there is an overlap
      return {
        snackVariant: 'error',
        msg: `We detected a overlap between ${days[day][start].eventName} and ${event.eventName}! Timetable may not be accurate`,
      };
    else {
      // no event yet
      days[day][start] = event;
    }
    return null;
  };
  return parseEventToTimetableObj;
};
