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

export default function SideMenu({ handleOpenDrawer }) {
  const [userCourse, setUserCourse] = useState();
  const { socket } = useSocket();

  useEffect(() => {
    getUserCourse(socket);
  }, []);

  useEffect(() => {
    socket.on('get user course', (userCourse) => {
      setUserCourse(userCourse);
    });
    return () => {
      socket.off('get user course');
    };
  }, []);

  return (
    <Box
      sx={{
        width: '30vw',
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{ display: 'flex', justifyContent: 'start', ml: 2 }}
      >
        Your Courses
        <IconButton sx={{ ml: 'auto ' }} onClick={() => handleOpenDrawer()}>
          <ArrowBackIosIcon />
        </IconButton>
      </Typography>
      {userCourse && <UserCourse userCourse={userCourse} />}
      <SearchBar userCourse={userCourse} />
    </Box>
  );
}
