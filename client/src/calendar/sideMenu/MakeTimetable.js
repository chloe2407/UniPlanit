import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import UserCourseSectionSelect from 'calendar/sideMenu/UserCourseSectionSelect';

export default function MakeTimetable({
  openDrawer,
  handleViewChange,
  buildTimetable,
  generatedTimetable,
}) {
  console.log(buildTimetable);
  console.log(generatedTimetable);
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
            transform: !openDrawer && 'rotate(90deg)',
            transition: (theme) =>
              theme.transitions.create('transform', {
                easing: theme.transitions.easing.sharp,
                duration: 225,
              }),
          }}
          onClick={() => handleViewChange(null, 'start')}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </Typography>
      <UserCourseSectionSelect
        userCourse={buildTimetable ? buildTimetable : generatedTimetable}
      />
      {/* <Button
        variant={'contained'}
        onClick={() => handleViewChange(null, 'start')}
      >
        Go Back
      </Button> */}
    </>
  );
}
