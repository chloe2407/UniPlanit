import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import schedule from './Schedule.js';
import EventCard from './Card.js';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell } from 'calendar/StyledTableCell';

const useStyles = makeStyles((theme) => ({
  schedule: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  time: {
    border: 'thin solid',
    padding: '1vh 0vw',
  },
  title: {
    backgroundColor: 'lightblue',
    border: 'thin solid',
  },
  border: {
    border: 'thin solid',
  },
  calendarText: {
    paddingTop: '1vh',
  },
}));

const WeekView = ({ userTimetable, timetableIndex }) => {
  // const classes = useStyles();
  const times = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const DayHeader = () => {
    return (
      <TableHead>
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <StyledTableCell align="center">Time</StyledTableCell>
          {days.map((day) => (
            <StyledTableCell key={day} align="center">
              {day}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const TableSlot = ({ time, day, event }) => {
    return (
      <StyledTableCell align="center"> {`${day}, ${time}`}</StyledTableCell>
    );
  };

  const TableSlots = () => {
    return [
      times.map((time) => (
        <TableRow key={time}>
          <StyledTableCell align="center" sx={{ width: '50px' }}>
            {time}
          </StyledTableCell>
          {days.map((day) => (
            <TableSlot key={`${time}${day}`} time={time} day={day} />
          ))}
        </TableRow>
      )),
    ];
  };

  // const listOfSchedulesKeys = Object.keys(schedule);
  // const listOfSchedulesValues = Object.values(schedule);

  // const selectedSchedule;
  // if (!currentSchedule) {
  //   // pick the first schedule
  //   selectedSchedule = listOfSchedulesValues[0];
  // } else {
  //   selectedSchedule = currentSchedule;
  // }
  // console.log(selectedSchedule);

  // if (!currentSession) {
  //   currentSession = 'F';
  // }

  return (
    <Box>
      <Container>
        <Table>
          <DayHeader />
          <TableBody>
            <TableSlots />
          </TableBody>
        </Table>
      </Container>
    </Box>
    // <Box>
    //   <Container>
    //     <Grid container style={{ marginBottom: '1vh' }}>
    //       {/* TITLE */}
    //       <Grid container item>
    //         <Grid item xs={2} lg={1}>
    //           <Typography className={classes.title}>Time</Typography>
    //         </Grid>
    //         {days.map((day) => {
    //           return (
    //             <Grid item xs key={day}>
    //               <Typography className={classes.title}>{day}</Typography>
    //             </Grid>
    //           );
    //         })}
    //       </Grid>
    //     </Grid>
    //     {/* TIMES */}
    //     {times.map((time) => (
    //       <div key={time} style={{ width: '100vw' }}>
    //         <Grid container item>
    //           {/* Time */}
    //           <Grid item xs={2} lg={1}>
    //             <Typography className={classes.time}>
    //               {time < 10 ? 0 : ''}
    //               {time}:00
    //             </Typography>
    //           </Grid>
    //           {/* Day */}
    //           {days.map((day) => {
    //             return (
    //               <div style={{ width: '100vw' }}>
    //                 <Grid container item xs>
    //                   {/* Time */}
    //                   <Grid item xs={2} lg={1}>
    //                     <Typography className={classes.time}>
    //                       {time < 10 ? 0 : ''}
    //                       {time}:00
    //                     </Typography>
    //                   </Grid>
    //                   {/* Day */}
    //                   {days.map((day) => {
    //                     return (
    //                       <Grid
    //                         item
    //                         xs
    //                         key={day}
    //                         style={{ borderLeft: '0.15vw solid black' }}
    //                       >
    //                         {/* Courses */}
    //                         {selectedSchedule.map((selectedCourse) => {
    //                           var startTime = Number(
    //                             selectedCourse.startTime.slice(0, 2)
    //                           );
    //                           var endTime = Number(
    //                             selectedCourse.endTime.slice(0, 2)
    //                           );

    //                           var filled, startFilled, endFilled;
    //                           var sameDay =
    //                             selectedCourse.daysOfWeek.includes(day);
    //                           var sameSession =
    //                             selectedCourse.courseSession ===
    //                               currentSession ||
    //                             selectedCourse.courseSession === 'Y';
    //                           var afterStartTime = startTime <= time;
    //                           var beforeEndTime = endTime > time;

    //                           // time is at an endpoint
    //                           if (time === startTime) {
    //                             startFilled =
    //                               selectedCourse.startTime.slice(3) !== '30';
    //                             endFilled = true;
    //                           } else if (time === endTime) {
    //                             startFilled = true;
    //                             endFilled =
    //                               selectedCourse.endTime.slice(3) === '30';
    //                             // time is in the middle
    //                           } else {
    //                             startFilled = true;
    //                             endFilled = true;
    //                           }
    //                           sameDay &&
    //                           sameSession &&
    //                           afterStartTime &&
    //                           beforeEndTime
    //                             ? (filled = true)
    //                             : (filled = false);

    //                           return (
    //                             <Grid
    //                               container
    //                               item
    //                               xs
    //                               className={classes.schedule}
    //                             >
    //                               {/* :00 -:30 */}
    //                               <Grid
    //                                 item
    //                                 xs
    //                                 className={classes.border}
    //                                 style={{
    //                                   backgroundColor:
    //                                     filled && startFilled
    //                                       ? selectedCourse.color
    //                                       : 'transparent',
    //                                   borderTop:
    //                                     startTime === time &&
    //                                     filled &&
    //                                     startFilled &&
    //                                     sameDay &&
    //                                     sameSession
    //                                       ? '0.3vh solid black'
    //                                       : '0vh solid black',
    //                                   borderBottom:
    //                                     endTime === time &&
    //                                     !endFilled &&
    //                                     sameDay &&
    //                                     sameSession
    //                                       ? '0.3vh solid black'
    //                                       : '0vh solid black',
    //                                   position: 'absolute',
    //                                   left: 0,
    //                                   right: 0,
    //                                 }}
    //                               >
    //                                 <div
    //                                   style={{
    //                                     display:
    //                                       startTime === time &&
    //                                       filled &&
    //                                       startFilled &&
    //                                       sameDay &&
    //                                       sameSession
    //                                         ? 'flex'
    //                                         : 'none',
    //                                   }}
    //                                 >
    //                                   <EventCard
    //                                     {...selectedCourse}
    //                                     {...currentSchedule}
    //                                   />
    //                                 </div>
    //                               </Grid>
    //                               {/* :30-:59 */}
    //                               <Grid
    //                                 item
    //                                 xs
    //                                 className={classes.border}
    //                                 style={{
    //                                   backgroundColor:
    //                                     filled && endFilled
    //                                       ? selectedCourse.color
    //                                       : 'transparent',
    //                                   borderTop:
    //                                     startTime === time &&
    //                                     filled &&
    //                                     !startFilled &&
    //                                     sameDay &&
    //                                     sameSession
    //                                       ? '0.3vh solid black'
    //                                       : '0vh solid black',
    //                                   borderBottom:
    //                                     endTime === time &&
    //                                     filled &&
    //                                     !endFilled &&
    //                                     sameDay &&
    //                                     sameSession
    //                                       ? '0.3vh solid black'
    //                                       : '0vh solid black',
    //                                   position: 'absolute',
    //                                   left: 0,
    //                                   right: 0,
    //                                 }}
    //                               >
    //                                 <div
    //                                   style={{
    //                                     display:
    //                                       startTime === time &&
    //                                       filled &&
    //                                       !startFilled &&
    //                                       sameDay &&
    //                                       sameSession
    //                                         ? 'flex'
    //                                         : 'none',
    //                                   }}
    //                                 >
    //                                   <EventCard
    //                                     {...selectedCourse}
    //                                     {...currentSchedule}
    //                                   />
    //                                 </div>
    //                               </Grid>
    //                             </Grid>
    //                           );
    //                         })}
    //                       </Grid>
    //                     );
    //                   })}
    //                 </Grid>
    //               </div>
    //             );
    //           })}
    //         </Grid>
    //       </div>
    //     ))}
    //     {/* </Grid> */}
    //   </Container>
    // </Box>
  );
};

export default WeekView;
