import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchBar from 'calendar/sideMenu/SearchBar';
import UserCourse from 'calendar/sideMenu/UserCourse';
import { getUser } from 'calendar/api/sideMenuApi';
import useAuth from 'context/Auth';
import Button from '@mui/material/Button';

export default function SideMenu({ openEdit, setOpenEdit, handleCloseDrawer }) {
  const { user, setUser } = useAuth();
  // const [userData, setUserData] = useState(demo) // whole thing is demo
  const [courseChangeCount, setCourseChangeCount] = useState(0);

  useEffect(() => {
    getUser(user._id).then((data) => !user.err && setUser(data));
  }, [courseChangeCount]);

  const handleChangingCourse = () => {
    setCourseChangeCount(courseChangeCount + 1);
  };

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
          {user && (
            <UserCourse
              user={user}
              handleChangingCourse={handleChangingCourse}
            />
          )}
          <SearchBar
            userCourses={user.courses}
            handleChangingCourse={handleChangingCourse}
          />
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
