import React from 'react';
import Typography from '@mui/material/Typography';
import SearchBar from 'calendar/sideMenu/SearchBar';
import UserCourse from 'calendar/sideMenu/UserCourse';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from '@mui/material/Box';
import FadeContent from 'react-fade-in';
import { FadeIn } from 'react-slide-fade-in';

export default function CourseSelection({
  userCourse,
  handleTabChange,
  handleViewChange,
}) {
  return (
    <FadeIn from={'right'} positionOffset={200} durationInMilliseconds={500}>
      <Box>
        <Typography
          variant="h5"
          sx={{ display: 'flex', textAlign: 'start', m: 3, mb: 1 }}
        >
          Your Courses
          <IconButton
            sx={{ ml: 'auto ' }}
            onClick={() => handleViewChange(null, 'start')}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Typography>
        <FadeContent delay={300}>
          <UserCourse userCourse={userCourse} />
          <SearchBar
            handleTabChange={handleTabChange}
            userCourse={userCourse}
            handleViewChange={handleViewChange}
          />
        </FadeContent>
      </Box>
    </FadeIn>
  );
}
