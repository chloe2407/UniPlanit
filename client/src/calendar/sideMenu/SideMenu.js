import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchBar from 'calendar/sideMenu/SearchBar';
import UserCourse from 'calendar/sideMenu/UserCourse';
import Button from '@mui/material/Button';
import useSocket from 'context/socket';
import { getUserCourse } from 'calendar/api/sideMenuApi';

export default function SideMenu({ openEdit, setOpenEdit, handleCloseDrawer }) {
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
    <Box mt={2}>
      {openEdit ? (
        <Typography>Editing</Typography>
      ) : (
        <>
          <Typography
            variant="h5"
            sx={{ display: 'flex', justifyContent: 'start', ml: 2 }}
          >
            Your Courses
          </Typography>
          {userCourse && <UserCourse userCourse={userCourse} />}
          <SearchBar userCourse={userCourse} />
        </>
      )}
      {/* <Button onClick={() => setOpenEdit(!openEdit)}>
        <Typography>
          {openEdit ? <>click to close edit</> : <>click to edit</>}
        </Typography>
      </Button> */}
    </Box>
  );
}
