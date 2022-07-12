import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Typography from '@mui/material/Typography';
import useSocket from 'context/socket';
import FadeContent from 'react-fade-in';
import { deleteCourse } from 'calendar/api/sideMenuApi';
import ClipLoader from 'react-spinners/ClipLoader';

export default function UserCourses({ userCourse, term }) {
  const { socket } = useSocket();
  const [currentDelete, setCurrentDelete] = useState(null);
  return (
    <>
      {userCourse ? (
        userCourse.length > 0 ? (
          <FadeContent>
            {userCourse.map((course) => (
              <Box key={course.courseCode}>
                <Typography>{course.courseTitle}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography>{course.courseCode}</Typography>
                  <Box sx={{ ml: 'auto' }}>
                    <IconButton
                      onClick={() => {
                        deleteCourse(
                          socket,
                          course.courseCode,
                          course.term,
                          term
                        );
                        setCurrentDelete(course.courseCode);
                        setTimeout(() => {
                          setCurrentDelete(null);
                        }, 3000);
                      }}
                    >
                      {currentDelete === course.courseCode ? (
                        <ClipLoader size={15} color={'black'} loading={true} />
                      ) : (
                        <DeleteOutlineIcon />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </FadeContent>
        ) : (
          <Typography>No courses yet. Start by adding a course!</Typography>
        )
      ) : (
        <ClipLoader />
      )}
    </>
  );
}
