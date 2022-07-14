import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);

export const useCourseMeetingTimeToEvent = () => {
  const courseMeetingTimeToEvent = (course, meetingTime, type) => {
    const start = dayjs({
      hour: parseInt(meetingTime.startTime.slice(0, 2)),
      minute: parseInt(meetingTime.startTime.slice(3, 5)),
    });
    const end = dayjs({
      hour: parseInt(meetingTime.endTime.slice(0, 2)),
      minute: parseInt(meetingTime.endTime.slice(3, 5)),
    });
    const diff = end.diff(start, 'minute');
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
      duration: diff,
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
  const convert24HourTo5Minutes = (time) => {
    // convert time from 24 hour to amount of 5 minutes passed since 7:00
    const splitIndex = time.indexOf(':');
    const hour = parseInt(time.slice(0, splitIndex));
    const minute = parseInt(time.slice(splitIndex + 1, 5));
    const fiveMinutes = (hour - 7) * 12 + Math.floor(minute / 5);
    return fiveMinutes;
  };

  const parseEventToTimetableObj = (days, event) => {
    const day = event.day;
    const startIn5Minutes = convert24HourTo5Minutes(event.startTime);
    // someone already has this course
    // console.log(event)
    // console.log(days[day][start]);
    if (
      days[day][startIn5Minutes] &&
      (days[day][startIn5Minutes].course?.section?.sectionCode ===
        event.course?.section?.sectionCode ||
        days[day][startIn5Minutes].course?.tutorial?.tutorialCode ===
          event.course?.tutorial?.tutorialCode)
    ) {
      if (
        days[day][startIn5Minutes].owner &&
        !days[day][startIn5Minutes].owner.includes(event.owner)
      ) {
        days[day][startIn5Minutes].owner.push(event.owner[0]);
        days[day][startIn5Minutes].ownerInitial.push(event.ownerInitial[0]);
      }
    } else if (days[day][startIn5Minutes]) {
      // there is an overlap
      return {
        snackVariant: 'error',
        msg: `We detected a overlap between ${days[day][startIn5Minutes].eventName} and ${event.eventName} at ${event.day} from ${event.startTime} to ${event.endTime}!`,
      };
    } else {
      // no event yet
      days[day][startIn5Minutes] = event;
    }
    return null;
  };
  return parseEventToTimetableObj;
};
