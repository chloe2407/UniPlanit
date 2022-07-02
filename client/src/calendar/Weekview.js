import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import EventCard from 'calendar/EventCard.js';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  useCourseMeetingTimeToEvent,
  useParseEventToTimetableObj,
} from 'calendar/hooks';
import useFeedback from 'context/feedback';
import useCalendar from 'context/calendar';

const WeekView = ({ sx }) => {
  // const classes = useStyles();
  const times = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  // const times = [7, 8];

  const courseMeetingTimeToEvent = useCourseMeetingTimeToEvent();
  const parseEventToTimetableObj = useParseEventToTimetableObj();
  const [parsedTimetable, setParsedTimetable] = useState(null);
  const { setMsg } = useFeedback();
  const { timetable } = useCalendar();
  const matchMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const matchSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  // just switch to "View on a desktop for the best experience"
  const WIDTH = matchMD ? '7rem' : '10vw';
  const HEIGHT = '5rem';

  // build an object of all the time and courses
  // give warning when overlapping is detected
  useEffect(() => {
    const days = createDay();
    // get current timetable
    timetable &&
      timetable.forEach((course) => {
        if (course.section) {
          course.section.meetingTimes.forEach((meetingTime) => {
            const event = courseMeetingTimeToEvent(
              course,
              meetingTime,
              'Lecture'
            );
            const res = parseEventToTimetableObj(days, event);
            res && setMsg(res);
          });
        }
        if (course.tutorial) {
          course.tutorial.meetingTimes.forEach((meetingTime) => {
            const event = courseMeetingTimeToEvent(
              course,
              meetingTime,
              'Tutorial'
            );
            const res = parseEventToTimetableObj(days, event);
            res && setMsg(res);
          });
        }
      });
    setParsedTimetable({ ...days });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timetable]);
  // console.log(parsedTimetable);

  const createDay = () => {
    return days.reduce((acc, curr) => ((acc[curr] = createTime()), acc), {});
  };

  const createTime = () => {
    return times.reduce((acc, curr) => ((acc[curr] = null), acc), {});
  };

  const DayHeader = () => {
    return (
      <Box
        sx={{
          height: 'fit-content',
          width: 'fit-content',
          my: 2,
        }}
      >
        <Box
          // align="center"
          sx={{
            display: 'inline-block',
            width: '5rem',
          }}
        >
          <Typography>Time</Typography>
        </Box>
        {days.map((day) => (
          <Typography key={day} sx={{ display: 'inline-block', width: WIDTH }}>
            {day}
          </Typography>
        ))}
      </Box>
    );
  };

  const TableSlot = ({ event }) => {
    return (
      <Box
        display={'inline-block'}
        sx={{
          borderTop: '1px solid rgba(224, 224, 224, 1)',
          width: WIDTH,
          height: HEIGHT,
        }}
      >
        {event && (
          <EventCard
            event={event}
            sx={{
              width: WIDTH,
              height: `${5 * event.duration}rem`,
              overflowY: 'auto',
            }}
          />
        )}
      </Box>
    );
  };

  const TableRow = ({ parsedTimetable }) => {
    return [
      times.map((time) => (
        <Box key={time} sx={{ height: HEIGHT, width: 'fit-content' }}>
          <Typography
            sx={{
              mt: '-0.6rem',
              display: 'inline-block',
              width: '5rem',
              verticalAlign: 'top',
            }}
          >{`${time}:00`}</Typography>
          {parsedTimetable &&
            days.map((day) => {
              return (
                <TableSlot
                  key={`${time}${day}`}
                  event={parsedTimetable[day][time]}
                />
              );
            })}
        </Box>
      )),
    ];
  };

  return (
    <Box sx={sx}>
      <Container style={{ maxWidth: 'fit-content' }}>
        {matchSM ? (
          <Stack
            direction={'column'}
            justifyContent="center"
            sx={{ height: '50vh' }}
          >
            <Typography variant={'h6'}>
              Sorry! We don't support mobile devices yet
            </Typography>
            <Typography variant={'h6'}>
              Visit us on desktop for the best experience
            </Typography>
          </Stack>
        ) : (
          <>
            <DayHeader />
            <TableRow parsedTimetable={parsedTimetable} />
          </>
        )}
      </Container>
    </Box>
  );
};

export default WeekView;
