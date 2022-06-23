import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Stack from '@mui/material/Stack';

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';

import schedule from './schedule.js';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'inherit',
    overflow: 'auto',
    alignItems: 'stretch',
    // backgroundColor: "blue",
  },
}));

const handleChange = () => {};

const EventCard = (course) => {
  const classes = useStyles();
  var selectedSchedule = schedule.schedule1;
  var selectedCourse = course;
  return (
    <Box className={classes.container}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flexStart',
        }}
      >
        <Typography variant="body">
          {selectedCourse.courseName} {selectedCourse.courseSection}{' '}
          {selectedCourse.courseSession}
        </Typography>
        <Typography variant="body">
          {selectedCourse.startTime}-{selectedCourse.endTime}
        </Typography>
        <Typography variant="body">{selectedCourse.location}</Typography>
      </div>
      <Stack direction="row" spacing={1}>
        <IconButton>
          <LockIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default EventCard;
