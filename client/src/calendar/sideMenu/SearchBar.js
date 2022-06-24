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
    } else {
      course.tutorial = section;
    }

    addUserCourse(socket, course);
  };

  const handleGenerate = () => {
    const courseCodes = userCourse.map((c) => c.courseCode);
    generateTimeTable(socket, courseCodes);
  };

  return (
    <Box mb={2}>
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
              <Container sx={{ m: 7, transform: 'scale(0.6)' }}>
                <img
                  className="ld ld-bounce"
                  style={{ animationDuration: '1s' }}
                  src="./calendar-loader.png"
                />
              </Container>
            </>
          ) : null
        ) : (
          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            <Divider sx={{ mt: 1, mb: 1, mx: 2 }} />
            {searchData.length === 0 ? (
              <Typography align="center">
                No Course With Matching Name And Term
              </Typography>
            ) : (
              <>
                <ListItem
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'baseline',
                    pt: 0,
                    pb: 0,
                  }}
                >
                  <Typography>List of Lectures</Typography>
                  <List>
                    {searchData[0].sections.map((lecture) => (
                      <ListItem
                        key={lecture._id}
                        sx={{
                          flexDirection: 'column',
                          alignItems: 'baseline',
                          pt: 0,
                          pb: 0,
                        }}
                      >
                        <Typography>[{lecture.sectionCode}]</Typography>
                        <Button
                          lecture={lecture}
                          sx={{ border: 1, borderRadius: 2 }}
                          onClick={() =>
                            handleAddCourseWithSection('lec', lecture)
                          }
                        >
                          <Typography>Add</Typography>
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </ListItem>
                <Divider sx={{ mt: 1, mb: 1, mx: 2 }} />
                <ListItem
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'baseline',
                    pt: 0,
                    pb: 0,
                  }}
                >
                  <Typography>List of Tutorials</Typography>
                  <List>
                    {searchData[0].tutorials.map((tutorial) => (
                      <ListItem
                        key={tutorial._id}
                        sx={{
                          flexDirection: 'column',
                          alignItems: 'baseline',
                          pt: 0,
                          pb: 0,
                        }}
                      >
                        <Typography>[{tutorial.tutorialCode}]</Typography>
                        <Button
                          tutorial={tutorial}
                          sx={{ border: 1, borderRadius: 2 }}
                          onClick={() =>
                            handleAddCourseWithSection('tut', tutorial)
                          }
                        >
                          <Typography>Add</Typography>
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </ListItem>
              </>
            )}
            <Divider sx={{ mt: 1, mb: 1, mx: 2 }} />
          </List>
        )}
      </Container>
    </Box>
  );
}
