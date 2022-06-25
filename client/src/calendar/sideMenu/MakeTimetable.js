import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import UserCourseSectionSelect from 'calendar/sideMenu/UserCourseSectionSelect';

export default function MakeTimetable({
  openDrawer,
  handleViewChange,
  buildTimetable,
}) {
  return (
    <>
      <Typography
        variant="h5"
        sx={{ display: 'flex', textAlign: 'start', m: 3, mb: 1 }}
      >
        Build a timetable
        <IconButton
          sx={{
            ml: 'auto ',
          }}
          onClick={() => handleViewChange(null, 'start')}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </Typography>
      <UserCourseSectionSelect userCourse={buildTimetable} />
    </>
  );
}
