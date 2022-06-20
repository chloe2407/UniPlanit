import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchBar from 'calendar/sideMenu/SearchBar';
import UserCourse from 'calendar/sideMenu/UserCourse';
import { getUser } from 'calendar/api/sideMenu';
import useAuth from 'context/Auth';

export default function SideMenu() {
  const { user, setUser } = useAuth();
  // const [userData, setUserData] = useState(demo) // whole thing is demo
  const [edit, setEdit] = useState(false);
  const [courseChangeCount, setCourseChangeCount] = useState(0);

  useEffect(() => {
    getUser(user._id).then((data) => !user.err && setUser(data));
  }, [courseChangeCount]);

  const handleChangingCourse = () => {
    setCourseChangeCount(courseChangeCount + 1);
  };

  return (
    <Box mt={2} sx={{ width: '40vh', overflow: 'auto' }}>
      {edit ? (
        <Typography>editing</Typography>
      ) : (
        <>
          <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'start', marginLeft: 3 }}>
            Your Courses
          </Typography>
          {user && <UserCourse user={user} handleChangingCourse={handleChangingCourse} />}
          <SearchBar userCourses={user.courses} handleChangingCourse={handleChangingCourse} />
        </>
      )}
      <button onClick={() => setEdit(!edit)}>click to edit or end edit</button>
    </Box>
  );
}
