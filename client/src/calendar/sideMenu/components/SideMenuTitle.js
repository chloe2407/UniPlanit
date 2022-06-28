import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useCalendar from 'context/calendar';

export default function SideMenuTitle({ title }) {
  const { setView } = useCalendar();
  return (
    <Typography
      variant="h5"
      sx={{ display: 'flex', textAlign: 'start', alignItems: 'center', mb: 1 }}
    >
      {title}
      <IconButton
        sx={{
          ml: 'auto ',
        }}
        onClick={() => setView('start')}
      >
        <ArrowBackIosIcon />
      </IconButton>
    </Typography>
  );
}
