import React, { useEffect, useState, useRef } from 'react';
import courseData from 'calendar/data/course_and_title.json';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import ClipLoader from 'react-spinners/ClipLoader';
import Stack from '@mui/material/Stack';
import useSocket from 'context/socket';
import useCalendar from 'context/calendar';
import {
  getCourse,
  addUserCourse,
  generateTimeTable,
  updateSelectedTimetable,
} from 'calendar/api/sideMenuApi';
import useFeedback from 'context/feedback';

export default function SearchBar({ userCourse, term }) {
  const [input, setInput] = useState({
    courseCode: '',
    university: 'uoft',
  });
  const [searchData, setSearchData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [btnIsLoading, setBtnIsLoading] = useState();
  const { socket } = useSocket();
  const { setMsg } = useFeedback();
  const { setNextPage } = useCalendar();
  const bottomRef = useRef();

  const filterOptions = createFilterOptions({
    limit: 15,
    ignoreCase: true,
  });

  useEffect(() => {
    if (input.courseCode && input.university) {
      setIsLoading(true);
      setSearchData(undefined);
      getCourse({
        courseCode: input.courseCode.slice(0, 8),
        university: input.university,
        term: term,
      }).then((data) => {
        setSearchData(data);
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  useEffect(() => {
    setBtnIsLoading(null);
  }, [userCourse]);

  const handleInputChange = (option, v) => {
    if (option === 'code') {
      setInput({
        ...input,
        courseCode: v,
      });
    } else {
      setInput({
        ...input,
        university: v,
      });
    }
  };

  const handleAddCourse = () => {
    setBtnIsLoading('add');
    addUserCourse(socket, searchData, term);
  };

  const buildNewTimetable = () => {
    if (userCourse?.length > 0) {
      return {
        timetable: userCourse.map((c) => {
          delete c.tutorials;
          delete c.lectures;
          return c;
        }),
        term: term,
      };
    }
  };

  const handleBuildTimetable = () => {
    setBtnIsLoading('build');
    setNextPage('edit');
    const timetable = buildNewTimetable();
    updateSelectedTimetable(socket, timetable);
  };

  const handleGenerateTimetable = () => {
    setBtnIsLoading('generate');
    setNextPage('generate');
    generateTimeTable(socket, term);
  };

  const handleSubmit = (cb, type) => {
    // build a clean timetable based on user courses and send it to the server
    setBtnIsLoading(type);
    if (userCourse.length > 0) {
      cb(socket, term);
    } else {
      setMsg({
        snackVariant: 'info',
        msg: 'Please Choose a Course First!',
      });
      setBtnIsLoading(null);
    }
  };

  return (
    <>
      <FormGroup sx={{ mb: 2 }}>
        <FormLabel id="search-label" sx={{ textAlign: 'left', mb: 2 }}>
          Search Course
        </FormLabel>
        <Autocomplete
          disablePortal
          id="search-course"
          options={courseData}
          filterOptions={filterOptions}
          onChange={(e, v) => handleInputChange('code', v)}
          renderInput={(params) => (
            <TextField {...params} label="Search Course" />
          )}
        />
      </FormGroup>

      {searchData === undefined ? (
        isLoading ? (
          <>
            <Container sx={{ transform: 'scale(0.6)' }}>
              <ClipLoader />
            </Container>
          </>
        ) : null
      ) : (
        <Box sx={{ overflow: 'auto', mb: 2 }}>
          {searchData ? (
            <>
              <Typography>Course</Typography>
              <Box sx={{ display: 'flex', m: 1 }}>
                <Typography variant="h6">{`${searchData.courseTitle} - ${searchData.term}`}</Typography>
                <LoadingButton
                  loading={btnIsLoading === 'add'}
                  variant="contained"
                  sx={{ ml: 'auto' }}
                  onClick={() => handleAddCourse()}
                >
                  Add this course
                </LoadingButton>
              </Box>
            </>
          ) : (
            <Typography align="center">
              No Course With Matching Name And Term
            </Typography>
          )}
        </Box>
      )}
      <div ref={bottomRef}></div>
      <Stack spacing={1}>
        <LoadingButton
          loading={btnIsLoading === 'build'}
          onClick={() => handleSubmit(handleBuildTimetable, 'build')}
          variant={'contained'}
        >
          <Typography>Choose Sections</Typography>
        </LoadingButton>

        <LoadingButton
          loading={btnIsLoading === 'generate'}
          onClick={() => handleSubmit(handleGenerateTimetable, 'generate')}
          variant={'contained'}
        >
          <Typography>Generate Timetables</Typography>
        </LoadingButton>
      </Stack>
    </>
  );
}
