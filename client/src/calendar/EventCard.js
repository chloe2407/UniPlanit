import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import initialToColor from 'components/InitialToColor';

const EventCard = ({ event, sx }) => {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  let eventCode;
  if (event.course) {
    if (event.type === 'section') {
      eventCode = event.course[event.type].sectionCode;
    } else if (event.type === 'tutorial') {
      eventCode = event.course[event.type].tutorialCode;
    }
  }
  return (
    <Card
      style={{ position: 'absolute' }}
      sx={{
        borderRadius: 0,
        opacity: 0.5,
      }}
    >
      <CardActionArea sx={sx} onClick={(e) => setAnchorEl(e.currentTarget)}>
        <CardContent sx={{ textAlign: 'center', p: 0 }}>
          <Typography>
            <strong>{event.eventName}</strong>
          </Typography>
          <Typography>{eventCode}</Typography>
          {event.ownerInitial && (
            <AvatarGroup max={3}>
              {event.ownerInitial.map((ownerInitial, i) => {
                return (
                  <Avatar
                    sx={{
                      height: 25,
                      width: 25,
                      backgroundColor: initialToColor(ownerInitial),
                    }}
                    key={i}
                  >
                    {ownerInitial}
                  </Avatar>
                );
              })}
            </AvatarGroup>
          )}
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
            <Typography>
              Owners: {event.owner && event.owner.join(', ')}
            </Typography>
          </Paper>
        </Popover>
      </Box>
    </Card>
  );
};

export default EventCard;
