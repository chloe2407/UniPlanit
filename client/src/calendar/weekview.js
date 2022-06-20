import React from 'react';

import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';

import schedule from './schedule.js';
import EventCard from './card.js';

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme) => ({
  schedule: {
    display: 'flex',
    flexDirection: 'column',
  },
  time: {
    border: 'thin solid',
    // padding: "6vh 0vw",
    //  [theme.breakpoints.up('sm')]: {
    //     padding: "2vh 0vw",
    //     backgroundColor: "orange"
    // },
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

const WeekView = ({ currentSession }) => {
  const classes = useStyles();
  const times = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  var selectedSchedule = schedule.schedule1;

  if (!currentSession) {
    currentSession = 'F';
  }

  return (
    <Grid container>
      {/* TITLE */}
      <Grid container item>
        <Grid item xs={2} lg={1}>
          <Typography className={classes.title}>Time</Typography>
        </Grid>
        {days.map((day) => {
          return (
            <Grid key={day} item xs>
              <Typography className={classes.title}>{day}</Typography>
            </Grid>
          );
        })}
      </Grid>
      {/* TIMES */}
      {times.map((time) => {
        return (
          <div key={time} style={{ width: '100vw' }}>
            <Grid container item>
              {/* Time */}
              <Grid item xs={2} lg={1}>
                <Typography className={classes.time}>
                  {time < 10 ? 0 : ''}
                  {time}:00
                </Typography>
              </Grid>
              {/* Day */}
              {days.map((day) => {
                return (
                  <Grid key={day} item xs style={{ borderLeft: '0.15vw solid black' }}>
                    {/* Courses */}
                    {selectedSchedule.map((selectedCourse) => {
                      var startTime = Number(selectedCourse.startTime.slice(0, 2));
                      var endTime = Number(selectedCourse.endTime.slice(0, 2));

                      var filled, startFilled, endFilled;
                      var sameDay = selectedCourse.daysOfWeek.includes(day);
                      var sameSession =
                        selectedCourse.courseSession === currentSession ||
                        selectedCourse.courseSession === 'Y';
                      var afterStartTime = startTime <= time;
                      var beforeEndTime = endTime > time;

                      // time is at an endpoint
                      if (time === startTime) {
                        startFilled = selectedCourse.startTime.slice(3) !== '30';
                        endFilled = true;
                      } else if (time === endTime) {
                        startFilled = true;
                        endFilled = selectedCourse.endTime.slice(3) === '30';
                        // time is in the middle
                      } else {
                        startFilled = true;
                        endFilled = true;
                      }
                      sameDay && sameSession && afterStartTime && beforeEndTime
                        ? (filled = true)
                        : (filled = false);

                      return (
                        <Grid container item xs className={classes.schedule}>
                          {/* :00 -:30 */}
                          <Grid
                            item
                            xs
                            className={classes.border}
                            style={{
                              backgroundColor:
                                filled && startFilled ? selectedCourse.color : 'transparent',
                              borderTop:
                                startTime === time &&
                                filled &&
                                startFilled &&
                                sameDay &&
                                sameSession
                                  ? '0.3vh solid black'
                                  : '0vh solid black',
                              borderBottom:
                                endTime === time && filled && !endFilled && sameDay && sameSession
                                  ? '0.3vh solid black'
                                  : '0vh solid black',
                            }}
                          >
                            <div
                              style={{
                                display:
                                  startTime === time &&
                                  filled &&
                                  startFilled &&
                                  sameDay &&
                                  sameSession
                                    ? 'flex'
                                    : 'none',
                              }}
                            >
                              <EventCard {...selectedCourse} />
                            </div>
                          </Grid>
                          {/* :30-:59 */}
                          <Grid
                            item
                            xs
                            className={classes.border}
                            style={{
                              backgroundColor:
                                filled && endFilled ? selectedCourse.color : 'transparent',
                              borderTop:
                                startTime === time &&
                                filled &&
                                !startFilled &&
                                sameDay &&
                                sameSession
                                  ? '0.3vh solid black'
                                  : '0vh solid black',
                              borderBottom:
                                endTime === time && filled && endFilled && sameDay && sameSession
                                  ? '0.3vh solid black'
                                  : '0vh solid black',
                            }}
                          >
                            <div
                              style={{
                                display:
                                  startTime === time &&
                                  filled &&
                                  !startFilled &&
                                  sameDay &&
                                  sameSession
                                    ? 'flex'
                                    : 'none',
                              }}
                            >
                              <EventCard {...selectedCourse} />
                            </div>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                );
              })}
            </Grid>
          </div>
        );
      })}
    </Grid>
  );
};

export default WeekView;
