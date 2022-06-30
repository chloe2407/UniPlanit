import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import useSocket from 'context/socket';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  updateTimetable,
  getBuildTimetable,
  getUserCourse,
} from 'calendar/api/sideMenuApi';
import useCalendar from 'context/calendar';

export default function UserCourseSectionSelect({ term }) {
  const [courseCodeShow, setCourseCodeShow] = useState([]);
  const [userCourseObj, setUserCourseObj] = useState();
  const [isLoading, setIsLoading] = useState();
  const { userCourse, buildTimetable } = useCalendar();
  const { socket } = useSocket();

  useEffect(() => {
    getUserCourse(socket, term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  useEffect(() => {
    getBuildTimetable(socket);
  }, []);

  // turn user course into objects
  // for some reason only one of the socket events is firing

  // useEffect(() => {
  //   socket.on('update timetable', () => {
  //     setIsLoading(false);
  //   });
  //   return () => socket.off('update timetable');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // console.log(buildTimetable);

  useEffect(() => {
    if (userCourse) {
      const userCourseObj = userCourse.reduce((acc, curr) => {
        acc[curr.courseCode] = curr;
        return acc;
      }, {});
      setUserCourseObj(userCourseObj);
    }
  }, [userCourse]);

  // console.log(userCourseObj);
  // console.log(buildTimetable);
  // add section/tutorials to a course in the current timetable
  const handleAddCourseWithSection = (courseCode, type, sectionCode) => {
    buildTimetable.timetable.forEach((course) => {
      if (course.courseCode === courseCode) {
        if (type === 'lec') {
          userCourseObj[courseCode].sections.forEach((section) => {
            if (section.sectionCode === sectionCode) {
              course.section = section;
            }
          });
          console.log(course);
        } else if (type === 'tut') {
          userCourseObj[courseCode].tutorials.forEach((tutorial) => {
            if (tutorial.tutorialCode === sectionCode) {
              course.tutorial = tutorial;
            }
          });
        }
      }
    });
    console.log('updating timetable');
    console.log(buildTimetable);
    updateTimetable(socket, buildTimetable);
  };

  const handleCourseCollapse = (courseCode) => {
    courseCodeShow.includes(courseCode)
      ? setCourseCodeShow([...courseCodeShow.filter((c) => c !== courseCode)])
      : setCourseCodeShow([...courseCodeShow, courseCode]);
  };

  const handleClearAllSections = () => {
    setIsLoading(true);
    updateTimetable(socket, null, true);
  };

  const getCurrentLecture = (courseCode) => {
    const currentLecture = buildTimetable.timetable.find((course) => {
      return course.courseCode === courseCode;
    }).section?.sectionCode;
    return currentLecture;
  };

  const getCurrentTutorial = (courseCode) => {
    const currentTutorial = buildTimetable.timetable.find((course) => {
      return course.courseCode === courseCode;
    }).tutorial?.tutorialCode;
    return currentTutorial;
  };

  const SelectLecture = ({ courseCode }) => {
    const currentLecture = getCurrentLecture(courseCode);
    const [lecture, setLecture] = useState(
      currentLecture ? currentLecture : 'Choose a Lecture'
    );

    return userCourseObj && userCourseObj[courseCode]?.sections?.length > 0 ? (
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ minWidth: 160, maxWidth: 160 }} size={'small'}>
          <Select
            id="section-select"
            value={lecture}
            onChange={(e) => {
              setLecture(e.target.value);
              handleAddCourseWithSection(courseCode, 'lec', e.target.value);
            }}
          >
            <MenuItem value={'Choose a Lecture'}>
              <Typography>Choose a Lecture</Typography>
            </MenuItem>
            {userCourseObj[courseCode].sections.map((lecture, i) => (
              <MenuItem
                key={lecture._id}
                value={lecture.sectionCode}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography>{lecture.sectionCode}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    ) : (
      <Typography>No Lectures Found For This Course!</Typography>
    );
  };

  const SelectTutorial = ({ courseCode }) => {
    const currentTutorial = getCurrentTutorial(courseCode);
    const [tutorial, setTutorial] = useState(
      currentTutorial ? currentTutorial : 'Choose a Tutorial'
    );
    return userCourseObj && userCourseObj[courseCode]?.tutorials?.length > 0 ? (
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ minWidth: 160, maxWidth: 160 }} size={'small'}>
          <Select
            id="tutorial-select"
            value={tutorial}
            onChange={(e) => {
              setTutorial(e.target.value);
              handleAddCourseWithSection(courseCode, 'tut', e.target.value);
            }}
          >
            <MenuItem value={'Choose a Tutorial'}>
              <Typography>Choose a Tutorial</Typography>
            </MenuItem>
            {userCourseObj[courseCode].tutorials.map((tutorial) => (
              <MenuItem
                key={tutorial._id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                }}
                value={tutorial.tutorialCode}
              >
                <Typography>{tutorial.tutorialCode}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    ) : (
      <Typography>No Tutorials Found For This Course!</Typography>
    );
  };

  return (
    <>
      {userCourse && userCourse.length > 0 ? (
        userCourse.map((course) => (
          <Box key={course.courseCode}>
            <Typography>{course.courseTitle}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>{course.courseCode}</Typography>
              <Box sx={{ ml: 'auto' }}>
                <IconButton
                  onClick={() => handleCourseCollapse(course.courseCode)}
                >
                  {courseCodeShow.includes(course.courseCode) ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </IconButton>
              </Box>
            </Box>
            <Collapse in={courseCodeShow.includes(course.courseCode)}>
              <Typography>Lectures</Typography>
              <Box sx={{ m: 1 }}>
                <SelectLecture courseCode={course.courseCode} />
              </Box>
              <Typography>Tutorials</Typography>
              <Box sx={{ m: 1 }}>
                <SelectTutorial courseCode={course.courseCode} />
              </Box>
            </Collapse>
            <Divider sx={{ my: 1 }} />
          </Box>
        ))
      ) : (
        <Typography variant="h6">
          No courses yet. Start by adding a course!
        </Typography>
      )}
      <LoadingButton
        // loading={isLoading}
        loading={false}
        variant={'contained'}
        sx={{ textTransform: 'capitalize' }}
        onClick={() => handleClearAllSections()}
      >
        Clear all sections
      </LoadingButton>
    </>
  );
}
