import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import EventCard from 'calendar/EventCard.js';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import { StyledTableCell } from 'calendar/StyledTableCell';
import {
  useCourseMeetingTimeToEvent,
  useParseEventToTimetableObj,
} from 'calendar/hooks';
import useSocket from 'context/socket';
import useFeedback from 'context/feedback';

const WeekView = ({
  sx,
  view,
  generatedTimetable,
  favTimetable,
  timetableIndex,
}) => {
  // const classes = useStyles();
  const times = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const courseMeetingTimeToEvent = useCourseMeetingTimeToEvent();
  const parseEventToTimetableObj = useParseEventToTimetableObj();
  const [buildTimetable, setBuildTimetable] = useState();
  const [parsedTimetable, setParsedTimetable] = useState(null);
  const { socket } = useSocket();
  const { setMsg } = useFeedback();

  // build an object of all the time and courses
  // give warning when overlapping is detected

  useEffect(() => {
    socket.on('update timetable', (timetable) => {
      setBuildTimetable(timetable);
    });
    return () => socket.off('update timetable');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // parse the current timetable
  useEffect(() => {
    const days = createDay();
    // get current timetable
    let timetable;
    if (view === 'generated') {
      timetable = generatedTimetable && generatedTimetable[timetableIndex];
    } else if (view === 'build') {
      timetable = buildTimetable && buildTimetable;
    } else if (view === 'fav') {
      timetable = favTimetable && favTimetable[timetableIndex];
    } else {
      timetable = undefined;
    }

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
    console.log(days);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedTimetable, buildTimetable, timetableIndex, favTimetable]);

  const createDay = () => {
    return days.reduce((acc, curr) => ((acc[curr] = createTime()), acc), {});
  };

  const createTime = () => {
    return times.reduce((acc, curr) => ((acc[curr] = null), acc), {});
  };

  const DayHeader = () => {
    return (
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <StyledTableCell sx={{ width: 'auto' }} align="center">
          Time
        </StyledTableCell>
        {days.map((day) => (
          <StyledTableCell key={day} align="center">
            {day}
          </StyledTableCell>
        ))}
      </TableRow>
    );
  };

  const TableSlot = ({ event }) => {
    return (
      <>
        {event !== 'skip' ? (
          <StyledTableCell
            align="center"
            rowSpan={event && event.duration}
            sx={{ padding: 0 }}
          >
            {event && (
              <EventCard
                event={event}
                sx={{
                  height: `${event.duration * 4.2}em`,
                  overflowY: 'auto',
                }}
              />
            )}
          </StyledTableCell>
        ) : null}
      </>
    );
  };

  const TableSlots = ({ parsedTimetable }) => {
    // do not render a cell if an event spans over it
    return [
      times.map((time) => (
        <TableRow key={time} sx={{ height: '2rem' }}>
          <StyledTableCell
            align="center"
            sx={{ borderTop: '0', borderBottom: '0' }}
          >
            <Typography
              sx={{ position: 'relative', top: '-1.7em' }}
            >{`${time}:00`}</Typography>
          </StyledTableCell>
          {parsedTimetable &&
            days.map((day) => {
              return (
                <TableSlot
                  key={`${time}${day}`}
                  event={parsedTimetable[day][time]}
                />
              );
            })}
        </TableRow>
      )),
    ];
  };

  return (
    <Box sx={sx}>
      <Container>
        <Table>
          <TableHead>
            <DayHeader />
          </TableHead>
          <TableBody>
            <TableSlots parsedTimetable={parsedTimetable} />
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
};

export default WeekView;
