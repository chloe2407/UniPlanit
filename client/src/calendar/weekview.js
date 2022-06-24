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
import { useCourseToEvent } from 'hooks/hook';

const WeekView = ({ userTimetable, timetableIndex }) => {
  // const classes = useStyles();
  const times = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const [courseToEvent] = useCourseToEvent();
  const [parsedTimetable, setParsedTimetable] = useState(null);

  // build an object of all the time and courses
  useEffect(() => {
    const days = createDay();
    userTimetable &&
      userTimetable[timetableIndex] &&
      userTimetable[timetableIndex].map((course) => {
        if (course.section) {
          course.section.meetingTimes.map((meetingTime) => {
            // need to extract the time
            const day = meetingTime.day;
            const start = parseInt(
              meetingTime.startTime.slice(0, 2)
            ).toString();
            const end = parseInt(meetingTime.endTime.slice(0, 2)).toString();
            const diff = parseInt(end) - parseInt(start);
            const courseEvent = courseToEvent(course, meetingTime);
            days[day][start] = courseEvent;
            if (diff > 1) {
              for (let i = 1; i < diff; i++) {
                days[day][(parseInt(start) + i).toString()] = 'skip';
              }
            }
          });
        }
      });
    setParsedTimetable({ ...days });
  }, [userTimetable, timetableIndex]);

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
    const dur = event ? parseInt(event.end) - parseInt(event.start) : null;
    return (
      <>
        {event !== 'skip' ? (
          <StyledTableCell align="center" rowSpan={dur} sx={{ padding: 0 }}>
            {event && (
              <EventCard
                event={event}
                sx={{ height: `${dur * 4.2}em`, overflowY: 'auto' }}
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
              sx={{ position: 'relative', top: '-2em' }}
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
    <Box>
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
