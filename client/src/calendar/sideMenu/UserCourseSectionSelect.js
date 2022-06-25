import React, { useEffect, useState, useRef } from 'react';
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
import Button from '@mui/material/Button';
import { updateTimetable, getMultipleCourse } from 'calendar/api/sideMenuApi';

export default function UserCourseSectionSelect({ userCourse }) {
  const endRef = useRef();
  const [courseCodeShow, setCourseCodeShow] = useState([]);
  const [userCourseObj, setUserCourseObj] = useState();
  const [searchData, setSearchData] = useState();
  const { socket } = useSocket();

  // turn user course into objects
  useEffect(() => {
    if (userCourse) {
      const temp = {};
      userCourse.map((v) => {
        temp[v.courseCode] = v;
      });
      setUserCourseObj(temp);
    }
  }, [userCourse]);

  // for currently selected courses, fetch their data from course collection
  useEffect(() => {
    userCourse &&
      Promise.all(getMultipleCourse(userCourse)).then((val) => {
        const temp = {};
        val.map((v) => {
          temp[v.courseCode] = v;
        });
        setSearchData(temp);
      });
  }, [userCourse]);

  useEffect(() => {
    scrollToBottom();
  }, [userCourse]);

  // add section/tutorials to a course in the current timetable
  const handleAddCourseWithSection = (courseCode, type, sectionCode) => {
    const course = userCourseObj[courseCode];
    const targetCourse = JSON.parse(
      JSON.stringify({ ...searchData[courseCode] })
    );
    if (sectionCode === 'Choose a Lecture') {
      delete course.section;
    } else if (sectionCode === ' Choose a Tutorial') {
      delete course.tutorial;
    } else if (type === 'lec') {
      for (const s of targetCourse['sections']) {
        if (s.sectionCode === sectionCode) course.section = s;
      }
    } else {
      for (const s of targetCourse['tutorials']) {
        if (s.tutorialCode === sectionCode) course.tutorial = s;
      }
    }
    updateTimetable(socket, course);
  };

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleCourseCollapse = (courseCode) => {
    courseCodeShow.includes(courseCode)
      ? setCourseCodeShow([...courseCodeShow.filter((c) => c !== courseCode)])
      : setCourseCodeShow([...courseCodeShow, courseCode]);
  };

  const SelectLecture = ({ courseCode }) => {
    const [lecture, setLecture] = useState(
      userCourseObj && userCourseObj[courseCode]?.section
        ? userCourseObj[courseCode].section.sectionCode
        : 'Choose a Lecture'
    );
    return searchData && searchData[courseCode]?.sections?.length > 0 ? (
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ width: 'fit-content' }}>
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
            {searchData[courseCode].sections.map((lecture, i) => (
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
    const [tutorial, setTutorial] = useState(
      userCourseObj && userCourseObj[courseCode]?.tutorial
        ? userCourseObj[courseCode].tutorial.tutorialCode
        : 'Choose a Tutorial'
    );
    return searchData && searchData[courseCode]?.tutorials?.length > 0 ? (
      <Box sx={{ display: 'flex' }}>
        <FormControl>
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
            {searchData[courseCode].tutorials.map((tutorial) => (
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
    <Box sx={{ overflow: 'auto', m: 3, my: 1, textAlign: 'left' }}>
      {userCourse && userCourse.length > 0 ? (
        userCourse.map((course, i) => (
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
                <SelectLecture courseIndex={i} courseCode={course.courseCode} />
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
      <div ref={endRef} />
      <Button
        sx={{ textTransform: 'capitalize' }}
        onClick={() => {
          updateTimetable(socket, null, true);
        }}
      >
        Clear all sections
      </Button>
    </Box>
  );
}
