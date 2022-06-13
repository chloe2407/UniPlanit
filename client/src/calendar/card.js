import React from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography, IconButton, Grid, makeStyles } from '@material-ui/core';

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';

import schedule from "./schedule.js";


const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "inherit",
        overflow: "auto",
        alignItems: "stretch",
        // backgroundColor: "blue",
    

    }
}))


const EventCard = ()  => {
    const classes = useStyles();
    var selectedSchedule = schedule.schedule1[0]
    return (
        <Box className={classes.container}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "flexStart"}}>
                    <Typography variant='body'>
                        {selectedSchedule.courseName} {selectedSchedule.courseSection} {selectedSchedule.courseSession}
                    </Typography>
                    <Typography variant='body'>{selectedSchedule.startTime}-{selectedSchedule.endTime}</Typography>
                    <Typography variant='body'>{selectedSchedule.location}</Typography>

                </div>
                <div style={{display: "flex", flexDirection: "row", alignSelf: "flexEnd"}}>
                    <IconButton size="small"><LockIcon fontSize='small'/></IconButton>
                    <IconButton size="small"><DeleteIcon fontSize='small'/></IconButton>
                </div>
        </Box>
        
    
    );
}

export default EventCard;
