import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';

const EventCard = ({ style, event, sx }) => {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  return (
    <Card sx={{ borderRadius: 0 }} style={style}>
      <CardActionArea sx={sx} onClick={(e) => setAnchorEl(e.currentTarget)}>
        <CardContent sx={{ textAlign: 'center', p: 0 }}>
          <Typography>
            <strong>{event.eventName}</strong>
          </Typography>
          <Typography>{event.course && event.type}</Typography>
        </CardContent>
      </CardActionArea>
      <Box>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={() => setAnchorEl(null)}
        >
          <Paper sx={{ padding: 2 }}>
            <Typography>{event.eventName}</Typography>
            <Typography>{event.course && event.course.courseTitle}</Typography>
            <Typography>Type: {event.type}</Typography>
            <Typography>
              Location: {event.location !== '' ? event.location : 'N/A'}
            </Typography>
            <Typography>Day: {event.day}</Typography>
            <Typography>Starts: {event.startTime}</Typography>
            <Typography>Ends: {event.endTime}</Typography>
          </Paper>
        </Popover>
      </Box>
    </Card>
  );
};

export default EventCard;
