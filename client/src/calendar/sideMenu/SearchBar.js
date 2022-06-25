import React, { useEffect, useState, useRef } from 'react';
import courseData from '../data/course_and_title.json';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import useSocket from 'context/socket';
import { ListItemIcon } from '@mui/material';
import {
  getCourse,
  addUserCourse,
  generateTimeTable,
} from 'calendar/api/sideMenuApi';

export default function SearchBar({ userCourse }) {
  const [input, setInput] = useState({
    courseCode: '',
    university: 'uoft',
    term: 'F',
  });
  const [searchData, setSearchData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleAddCourseWithSection = (type, section) => {
    // call server make change
    // update current state for new user courses
    // handleAdding
    let course;
    userCourse.map((c) => {
      if (c.courseCode === searchData[0].courseCode) course = c;
    });
    if (!course) {
      course = { ...searchData[0] };
      delete course.tutorials;
      delete course.sections;
    }
    if (type === 'lec') {
      course.section = section;
    } else if (type === 'tut') {
      course.tutorial = section;
    }
    addUserCourse(socket, course);
  };

  const handleGenerate = () => {
    const courseCodes = userCourse.map((c) => c.courseCode);
    generateTimeTable(socket, courseCodes);
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
          <Box sx={{ maxHeight: 300, overflow: 'auto', mb: 2 }}>
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
                    sx={{ ml: 'auto' }}
                    onClick={() => handleAddCourseWithSection(null, null)}
                  >
                    Add this course
                  </Button>
                </Box>
                <Divider sx={{ mt: 2, mb: 1, mx: 2 }} />
                <Typography>Lectures</Typography>
                <Box sx={{ m: 1 }}>
                  {searchData[0].sections.length > 0 ? (
                    searchData[0].sections.map((lecture) => (
                      <Box
                        key={lecture._id}
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      >
                        <Typography>
                          <strong>{lecture.sectionCode}</strong>
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{ ml: 'auto', textTransform: 'capitalize' }}
                          onClick={() =>
                            handleAddCourseWithSection('lec', lecture)
                          }
                        >
                          <Typography>Add</Typography>
                        </Button>
                      </Box>
                    ))
                  ) : (
                    <Typography>No Lecture Found For This Course!</Typography>
                  )}
                </Box>
                <Divider sx={{ mt: 2, mb: 1, mx: 2 }} />
                <Typography>Tutorials</Typography>
                <Box sx={{ m: 1 }}>
                  {searchData[0].tutorials.length > 0 ? (
                    searchData[0].tutorials.map((tutorial) => (
                      <Box
                        key={tutorial._id}
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      >
                        <Typography>
                          <strong>{tutorial.tutorialCode}</strong>
                        </Typography>
                        <Button
                          sx={{ ml: 'auto', textTransform: 'capitalize' }}
                          variant="contained"
                          onClick={() =>
                            handleAddCourseWithSection('tut', tutorial)
                          }
                        >
                          <Typography>Add</Typography>
                        </Button>
                      </Box>
                    ))
                  ) : (
                    <Typography>No Lecture Found For This Course!</Typography>
                  )}
                </Box>
              </>
            )}
          </Box>
        )}
        <div ref={bottomRef}></div>
        <Button onClick={() => handleGenerate()} variant={'contained'}>
          Generate Timetable
        </Button>
      </Container>
    </Box>
  );
}
