import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchBar from 'calendar/sideMenu/SearchBar';
import UserCourse from 'calendar/sideMenu/UserCourse';
import Button from '@mui/material/Button';
import useSocket from 'context/socket';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getUserCourse } from 'calendar/api/sideMenuApi';

export default function MakeTimetable({
  userCourse,
  openDrawer,
  handleOpenDrawer,
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
            transform: !openDrawer && 'rotate(90deg)',
            transition: (theme) =>
              theme.transitions.create('transform', {
                easing: theme.transitions.easing.sharp,
                duration: 225,
              }),
          }}
          onClick={() => {
            handleOpenDrawer();
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </Typography>
      {userCourse && <UserCourse userCourse={userCourse} />}
    </>
  );
}
