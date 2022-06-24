import React, { useEffect, useState, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import useSocket from 'context/socket';
import {
  lockCourse,
  deleteCourse,
  lockCourseSection,
  deleteCourseSection,
} from 'calendar/api/sideMenuApi';

export default function UserCourses({ userCourse }) {
  const endRef = useRef();
  const [courseCodeShow, setCourseCodeShow] = useState([]);
  const { socket } = useSocket();

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [userCourse]);

  const handleApiCall = (cb, courseCode, type) => {
    cb(socket, courseCode, type);
  };

  const handleCourseCollapse = (courseCode) => {
    courseCodeShow.includes(courseCode)
      ? setCourseCodeShow([...courseCodeShow.filter((c) => c !== courseCode)])
      : setCourseCodeShow([...courseCodeShow, courseCode]);
  };

  return (
    <List sx={{ maxHeight: '50vh', overflow: 'auto' }}>
      {userCourse &&
        userCourse.map((course) => (
          <Box key={course.courseCode}>
            <ListItem
              key={course.courseCode}
              sx={{
                flexDirection: 'column',
                alignItems: 'baseline',
                pt: 0,
                pb: 0,
              }}
            >
              <Box>
                <Typography>{course.courseTitle}</Typography>
              </Box>
              <Box>
                <Typography sx={{ display: 'inline-block' }}>
                  {course.courseCode}
                </Typography>
                <Box sx={{ display: 'inline-block' }}>
                  <IconButton
                    onClick={() => handleCourseCollapse(course.courseCode)}
                  >
                    {courseCodeShow.includes(course.courseCode) ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => handleApiCall(lockCourse, course.courseCode)}
                  >
                    {course.isLocked ? <LockIcon /> : <LockOpenIcon />}
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      handleApiCall(deleteCourse, course.courseCode)
                    }
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              </Box>

              {course.section && (
                <Collapse
                  in={courseCodeShow.includes(course.courseCode)}
                  timeout="auto"
                >
                  <List sx={{ p: 0 }}>
                    <ListItem sx={{ pb: 0, pt: 0 }}>
                      <Typography>
                        {course.section.sectionCode}
                        <IconButton
                          onClick={() =>
                            handleApiCall(
                              lockCourseSection,
                              course.courseCode,
                              'section'
                            )
                          }
                          disabled={course.isLocked}
                        >
                          {course.section.isLocked ? (
                            <LockIcon />
                          ) : (
                            <LockOpenIcon />
                          )}
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            handleApiCall(
                              deleteCourseSection,
                              course.courseCode,
                              'section'
                            )
                          }
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
              )}
              {course.tutorial && (
                <Collapse
                  in={courseCodeShow.includes(course.courseCode)}
                  timeout="auto"
                >
                  <List sx={{ p: 0 }}>
                    <ListItem sx={{ pb: 0, pt: 0 }}>
                      <Typography>
                        <IconButton
                          // need fix
                          onClick={() =>
                            handleApiCall(
                              lockCourseSection,
                              course.courseCode,
                              'tutorial'
                            )
                          }
                          disabled={course.isLocked}
                        >
                          {course.tutorial.isLocked ? (
                            <LockIcon />
                          ) : (
                            <LockOpenIcon />
                          )}
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            handleApiCall(
                              deleteCourseSection,
                              course.courseCode,
                              'tutorial'
                            )
                          }
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                        {course.tutorial.tutorialCode}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
              )}
            </ListItem>
            <Divider sx={{ mt: 1, mb: 1, mx: 2 }} />
          </Box>
        ))}
      <div ref={endRef} />
    </List>
  );
}
