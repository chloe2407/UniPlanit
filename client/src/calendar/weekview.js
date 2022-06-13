import React from 'react';
// import { Grid, makeStyles, Typography} from '@material-ui/core';

import Grid from '@mui/material/Grid';
import  { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

import schedule from "./schedule.js";
import EventCard from "./card.js"

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';



const useStyles = makeStyles(theme => ({
    schedule: {
        display: "flex",
        flexDirection: "column",
    },
    time: {
        border: "thin solid",
        // padding: "6vh 0vw",
        //  [theme.breakpoints.up('sm')]: {
        //     padding: "2vh 0vw",
        //     backgroundColor: "orange"
        // },
        

        
    },
    title: {
        backgroundColor: "lightblue",
        border: "thin solid"

    },
    border: {
        border: "thin solid",
    },
    calendarText: {
        paddingTop: "1vh",
    },
    

    
  }))

const WeekView = ({currentSession}) => {
    const classes = useStyles();
    const times = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    var selectedSchedule = schedule.schedule1[0]

    return (
        <Grid container>
            {/* TITLE */}
            <Grid container item>
                <Grid item xs={2} lg={1}><Typography className={classes.title}>Time</Typography></Grid>
                {days.map((day) => {
                            return (
                                <Grid item xs><Typography className={classes.title}>{day}</Typography></Grid>
                            )
                })}
            </Grid>
            {/* TIMES */}
            {times.map((time) => {
                return (
                    <div style={{width: "100vw"}}>
                    <Grid container item>
                        {/* Time */}
                        <Grid item xs={2} lg={1}><Typography className={classes.time}>{time < 10 ? 0 : ''}{time}:00</Typography></Grid>
                        {days.map((day) => {
                            var startTime = Number(selectedSchedule.startTime.slice(0,2))
                            var endTime = Number(selectedSchedule.endTime.slice(0,2))

                            var filled, startFilled, endFilled
                            var sameDay = selectedSchedule.daysOfWeek.includes(day)
                            var sameSession = selectedSchedule.courseSession === currentSession || selectedSchedule.courseSession === "Y"
                            var afterStartTime = startTime <= time
                            var beforeEndTime = endTime > time

                            
                            // time is at an endpoint
                            if (time === startTime) {
                                startFilled = selectedSchedule.startTime.slice(3) !== "30"
                                endFilled = true
                            } else if (time === endTime) {
                                startFilled = true
                                endFilled = selectedSchedule.endTime.slice(3) === "30"
                            // time is in the middle
                            } else {
                                startFilled = true
                                endFilled = true
                            }
                            sameDay && sameSession && afterStartTime && beforeEndTime ? filled = true : filled = false

                            return (
                                    <Grid container item xs className={classes.schedule}>
                                        {/* :00 -:30 */}
                                        <Grid item xs className={classes.border} style={{backgroundColor: filled && startFilled ? selectedSchedule.color: 'transparent',
                                                                                        borderTop: startTime === time && filled && startFilled && sameDay && sameSession? "0.3vh solid black": "0vh solid black",
                                                                                        borderBottom: endTime === time && filled && !endFilled && sameDay && sameSession? "0.3vh solid black": "0vh solid black"
                                                                                        }}>
                                            
                                            <div style={{display: startTime === time && filled && startFilled && sameDay && sameSession? "flex" : "none"}}><EventCard/></div>

                                        </Grid>
                                        {/* :30-:59 */}
                                        <Grid item xs className={classes.border} style={{backgroundColor: filled && endFilled ? selectedSchedule.color: 'transparent',
                                                                                        borderTop: startTime === time && filled && !startFilled && sameDay && sameSession? "0.3vh solid black": "0vh solid black",
                                                                                        borderBottom: endTime === time && filled && endFilled && sameDay && sameSession? "0.3vh solid black": "0vh solid black"
                                                                                        }}>
        
                                            <div style={{display: startTime === time && filled && !startFilled && sameDay && sameSession? "flex" : "none"}}><EventCard/></div>
                                        </Grid>
                                    </Grid>
                            )
                        })}
                    </Grid>
                    </div>
                
            )
            })
            }
            </Grid>
    )};

export default WeekView;
