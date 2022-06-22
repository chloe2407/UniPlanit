import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Stack from '@mui/material/Stack';
import { Popover } from '@mui/material';

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import schedule from "./schedule.js";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "stretch",
    },
    text: {
         [theme.breakpoints.down('md')]: {
            fontSize: "1.1vw",
         },
         [theme.breakpoints.down('sm')]: {
            fontSize: "1.3vw",
         },
    },
    buttons: {
        width: "25%",
        [theme.breakpoints.down('xs')]: {
            width: "10%",
         },
        
    }
}))

const handleChange = () => {
    

}


const EventCard = (course, currentSchedule)  => {
    const classes = useStyles();
    var selectedSchedule = currentSchedule
    var selectedCourse = course

    var smallClass
    if (Number(selectedCourse.endTime.slice(0,2)) - Number(selectedCourse.startTime.slice(0,2)) < 2) {
        smallClass = true
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Box className={classes.container} style={{flexDirection: smallClass? "row": "column"}}>
            <div style={{display: "flex", justifyContent: "flexStart", flexDirection: "column", marginLeft: "1vw"}}>
                    <Typography variant='body' style={{display: "flex"}} className={classes.text}>
                        {selectedCourse.courseName} {selectedCourse.courseSection} {selectedCourse.courseSession}
                    </Typography>
                    <Typography variant='body' style={{display: smallClass? "none": "flex"}} className={classes.text}>{selectedCourse.startTime}-{selectedCourse.endTime} || {selectedCourse.location}</Typography>

                </div>
                <Stack direction="row">
                    <IconButton className={classes.buttons}><LockIcon fontSize='small'/></IconButton>
                    <IconButton className={classes.buttons}><DeleteIcon fontSize='small' /></IconButton>
                    <IconButton className={classes.buttons}><MoreHorizIcon fontSize='small' onClick={handleClick} /></IconButton>

                </Stack>
                
                <Popover 
                 id={id}
                 open={open}
                 anchorEl={anchorEl}
                 onClose={handleClose}
                 anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                 }}
                 transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                 }}
                >
                The content of the Popover.
                </Popover>

        </Box>
        
    
    );
}

export default EventCard;
