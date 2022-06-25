import React, { useEffect, useState, useRef } from 'react';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { getCourse, addUserCourse } from 'calendar/api/sideMenuApi';

import { deleteCourse } from 'calendar/api/sideMenuApi';

export default function UserCourses({ userCourse }) {
  const endRef = useRef();
  // const [courseCodeShow, setCourseCodeShow] = useState([]);
  // const [lecture, setLecture] = useState('Choose a Lecture');
  // const [tutorial, setTutorial] = useState('Choose a Tutorial');
  // const [searchData, setSearchData] = useState(undefined);
  const { socket } = useSocket();

  // const handleAddCourseWithSection = (type, section) => {
  //   // call server make change
  //   // update current state for new user courses
  //   // handleAdding
  //   let course;
  //   userCourse.map((c) => {
  //     if (c.courseCode === searchData[0].courseCode) course = c;
  //   });
  //   if (!course) {
  //     course = { ...searchData[0] };
  //     delete course.tutorials;
  //     delete course.sections;
  //   }
  //   if (type === 'lec') {
  //     course.section = section;
  //   } else if (type === 'tut') {
  //     course.tutorial = section;
  //   }
  //   addUserCourse(socket, course);
  // };

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [userCourse]);

  const handleApiCall = (cb, courseCode, type) => {
    cb(socket, courseCode, type);
  };

  // const handleCourseCollapse = (courseCode) => {
  //   courseCodeShow.includes(courseCode)
  //     ? setCourseCodeShow([...courseCodeShow.filter((c) => c !== courseCode)])
  //     : setCourseCodeShow([...courseCodeShow, courseCode]);
  // };

  return (
    <Box sx={{ overflow: 'auto', m: 3, my: 1, textAlign: 'left' }}>
      {userCourse && userCourse.length > 0 ? (
        userCourse.map((course) => (
          <Box key={course.courseCode}>
            <Typography>{course.courseTitle}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>{course.courseCode}</Typography>
              <Box sx={{ ml: 'auto' }}>
                {/* <IconButton
                  onClick={() => handleCourseCollapse(course.courseCode)}
                >
                  {courseCodeShow.includes(course.courseCode) ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </IconButton> */}
                <IconButton
                  onClick={() => handleApiCall(deleteCourse, course.courseCode)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </Box>
            {/* {course.section && (
              <Collapse in={courseCodeShow.includes(course.courseCode)}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ ml: 2 }}>
                    {course.section.sectionCode}
                  </Typography>
                  <Box sx={{ ml: 'auto' }}>
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
                  </Box>
                </Box>
              </Collapse>
            )} */}
            {/* {course.tutorial && (
              <Collapse in={courseCodeShow.includes(course.courseCode)}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ ml: 2 }}>
                    {course.tutorial.tutorialCode}
                  </Typography>
                  <Box sx={{ ml: 'auto' }}>
                    <IconButton
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
                  </Box>
                </Box>
              </Collapse>
            )} */}
            <Divider sx={{ mt: 1, mb: 1, mx: 2 }} />
          </Box>
        ))
      ) : (
        <Typography variant="h6">
          No courses yet. Start by adding a course!
        </Typography>
      )}
      <div ref={endRef} />
    </Box>
  );
}
