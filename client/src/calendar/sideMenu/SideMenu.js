import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchBar from 'calendar/sideMenu/SearchBar';
import UserCourse from 'calendar/sideMenu/UserCourse';
import useSocket from 'context/socket';
import { getUserCourse } from 'calendar/api/sideMenuApi';

export default function SideMenu() {
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
    <Box mt={2} sx={{ overflow: 'auto' }}>
      <Typography
        variant="h5"
        sx={{ display: 'flex', justifyContent: 'start', marginLeft: 3 }}
      >
        Your Courses
      </Typography>
      {userCourse && <UserCourse userCourse={userCourse} />}
      <SearchBar userCourse={userCourse} />
    </Box>
  );
}
