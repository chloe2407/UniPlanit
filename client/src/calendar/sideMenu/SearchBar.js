import React, { useEffect, useState, useRef } from 'react';
import courseData from '../data/course_and_title.json';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import useSocket from 'context/socket';
import {
  getCourse,
  addUserCourse,
  generateTimeTable,
  makeNewTimetable,
} from 'calendar/api/sideMenuApi';

export default function SearchBar({ userCourse }) {
  const [input, setInput] = useState({
    courseCode: '',
    university: 'uoft',
    term: 'F',
  });
  const [searchData, setSearchData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  // const [lecture, setLecture] = useState('Choose a Lecture');
  // const [tutorial, setTutorial] = useState('Choose a Tutorial');
  const { socket } = useSocket();
  const bottomRef = useRef();

  const filterOptions = createFilterOptions({
    limit: 15,
    ignoreCase: true,
  });

  const terms = ['F', 'S', 'Y'];

  useEffect(() => {
    if (input.courseCode && input.term && input.university) {
      setIsLoading(true);
      setSearchData(undefined);
      getCourse({
        courseCode: input.courseCode.slice(0, 8),
        university: input.university,
        term: input.term,
      }).then((data) => {
        setSearchData(data);
        setIsLoading(false);
      });
    }
    // setLecture('Choose a Lecture');
    // setTutorial('Choose a Tutorial');
  }, [input]);

  const handleInputChange = (option, v) => {
    if (option === 'code') {
      setInput({
        ...input,
        courseCode: v,
      });
    } else if (option === 'term') {
      setInput({
        ...input,
        term: v,
      });
    } else {
      setInput({
        ...input,
        university: v,
      });
    }
  };

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

  const handleAddCourse = () => {
    addUserCourse(socket, searchData[0]);
  };

  const handleGenerate = () => {
    generateTimeTable(socket, userCourse);
  };

  const handleMake = () => {
    console.log(userCourse);
    makeNewTimetable(socket, userCourse);
  };

  return (
    <Box mb={2} sx={{ textAlign: 'start' }}>
      <Container>
        <FormGroup sx={{ mb: 1 }}>
          <FormLabel id="search-label" sx={{ textAlign: 'left', mb: 2 }}>
            Search Course
          </FormLabel>
          <Autocomplete
            sx={{ mb: 2 }}
            disablePortal
            id="search-course"
            options={courseData}
            filterOptions={filterOptions}
            onChange={(e, v) => handleInputChange('code', v)}
            renderInput={(params) => (
              <TextField {...params} label="Search Course" />
            )}
          />
          <FormLabel id="term-label" sx={{ textAlign: 'left' }}>
            Term
          </FormLabel>
          <RadioGroup
            row
            sx={{ mx: 1 }}
            value={input.term}
            onChange={(e) => handleInputChange('term', e.target.value)}
          >
            {terms.map((t) => (
              <FormControlLabel
                key={t}
                value={t}
                control={<Radio size="small" />}
                label={t}
              />
            ))}
          </RadioGroup>
        </FormGroup>

        {searchData === undefined ? (
          isLoading ? (
            <>
              <Container sx={{ transform: 'scale(0.6)' }}>
                <img
                  className="ld ld-bounce"
                  style={{ animationDuration: '1s' }}
                  src="./calendar-loader.png"
                />
              </Container>
            </>
          ) : null
        ) : (
          <Box sx={{ overflow: 'auto', mb: 2 }}>
            {searchData.length === 0 ? (
              <Typography align="center">
                No Course With Matching Name And Term
              </Typography>
            ) : (
              <>
                <Typography>Course</Typography>
                <Box sx={{ display: 'flex', m: 1 }}>
                  <Typography variant="h6">
                    {searchData[0].courseTitle}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ ml: 'auto', textTransform: 'capitalize' }}
                    onClick={() => handleAddCourse()}
                  >
                    Add this course
                  </Button>
                </Box>
              </>
            )}
          </Box>
        )}
        <div ref={bottomRef}></div>
        <Box sx={{ display: 'flex' }}>
          <Button
            sx={{ textTransform: 'capitalize' }}
            onClick={() => handleMake()}
            variant={'contained'}
          >
            <Typography>Build!</Typography>
          </Button>
          <Button
            sx={{ textTransform: 'capitalize', ml: 'auto' }}
            onClick={() => handleGenerate()}
            variant={'contained'}
          >
            <Typography>Generate!</Typography>
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
