import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchBar from './SearchBar';
import UserCourse from './UserCourse';
import Button from '@mui/material/Button';
import useSocket from '../../context/socket';
import { getUserCourse } from '../api/sideMenuApi';

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
    <Box mt={2} sx={{ overflow: 'auto' }}>
      {openEdit ? (
        <Typography>Editing</Typography>
      ) : (
        <>
          <Button onClick={handleCloseDrawer}>click to go back</Button>
          <Typography
            variant="h5"
            sx={{ display: 'flex', justifyContent: 'start', marginLeft: 3 }}
          >
            Your Courses
          </Typography>
          {userCourse && <UserCourse userCourse={userCourse} />}
          <SearchBar userCourse={userCourse} />
        </>
      )}
      <Button onClick={() => setOpenEdit(!openEdit)}>
        <Typography>
          {openEdit ? <>click to close edit</> : <>click to edit</>}
        </Typography>
      </Button>
    </Box>
  );
}
