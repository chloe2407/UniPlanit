import React from 'react';
import Typography from '@mui/material/Typography';
import SearchBar from 'calendar/sideMenu/SearchBar';
import UserCourse from 'calendar/sideMenu/UserCourse';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function CourseSelection({
  userCourse,
  openDrawer,
  handleTabChange,
  handleViewChange,
}) {
  return (
    <>
      <Typography
        variant="h5"
        sx={{ display: 'flex', textAlign: 'start', m: 3, mb: 1 }}
      >
        Your Courses
        <IconButton
          sx={{
            ml: 'auto ',
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
      <UserCourse userCourse={userCourse} />
      <SearchBar
        handleTabChange={handleTabChange}
        userCourse={userCourse}
        handleViewChange={handleViewChange}
      />
    </>
  );
}
