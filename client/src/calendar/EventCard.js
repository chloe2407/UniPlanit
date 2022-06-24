import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = ({ event, sx }) => {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  return (
    <Card sx={sx}>
      <CardActionArea onClick={(e) => setAnchorEl(e.currentTarget)}>
        <CardContent sx={{ textAlign: 'start' }}>
          <Typography>
            <strong>{event.eventName}</strong>
          </Typography>
          <Typography>Type: {event.type}</Typography>
          {/* <Typography>
            Location: {event.location !== '' ? event.location : 'N/A'}
          </Typography>
          <Typography>Day: {event.day}</Typography>
          <Typography>Starts: {event.start}</Typography>
          <Typography>Ends: {event.end}</Typography> */}
        </CardContent>
      </CardActionArea>
      <Box>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          onClose={() => setAnchorEl(null)}
        >
          <Paper>
            <Typography>CardContent</Typography>
          </Paper>
        </Popover>
      </Box>
    </Card>
  );
};

export default EventCard;
