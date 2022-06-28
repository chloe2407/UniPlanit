import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Typography from '@mui/material/Typography';
import useSocket from 'context/socket';
import FadeContent from 'react-fade-in';
import { deleteCourse } from 'calendar/api/sideMenuApi';

export default function UserCourses({ userCourse }) {
  const { socket } = useSocket();

  const handleApiCall = (cb, courseCode, type) => {
    cb(socket, courseCode, type);
  };

  return (
    <>
      {userCourse && userCourse.length > 0 ? (
        <FadeContent>
          {userCourse.map((course) => (
            <Box key={course.courseCode}>
              <Typography>{course.courseTitle}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>{course.courseCode}</Typography>
                <Box sx={{ ml: 'auto' }}>
                  <IconButton
                    onClick={() =>
                      handleApiCall(deleteCourse, course.courseCode)
                    }
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider sx={{ mt: 1, mb: 1, mx: 2 }} />
            </Box>
          ))}
        </FadeContent>
      ) : (
        <Typography>No courses yet. Start by adding a course!</Typography>
      )}
    </>
  );
}
