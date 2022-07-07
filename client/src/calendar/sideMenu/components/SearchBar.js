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
import Slider from '@mui/material/Slider';

export default function SearchBar({ userCourse, term }) {
  const [input, setInput] = useState({
    courseCode: '',
    university: 'uoft',
  });
  const [searchData, setSearchData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [btnIsLoading, setBtnIsLoading] = useState(null);
  const [timeFilter, setTimeFilter] = useState([0, 100]);
  const { socket } = useSocket();
  const { setMsg } = useFeedback();
  const { setNextPage } = useCalendar();
  const bottomRef = useRef();
  const times = Array.from({ length: 16 }, (_, i) => ({
    value: (100 / 15) * i * 1,
    label: `${i * 1 + 7}`,
  }));

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
    setTimeout(() => {
      setBtnIsLoading(null);
    }, 2000);
    setNextPage('generate');
    const convertedTimeFilter = timeFilter.map((v) => 7 + (v / 100) * 15);
    generateTimeTable(socket, term, convertedTimeFilter);
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

  const handleTimeFilterChange = (event, newValue, activeThumb) => {
    if (activeThumb === 0) {
      setTimeFilter([
        Math.min(newValue[0], timeFilter[1] - 100 / 15),
        timeFilter[1],
      ]);
    } else {
      setTimeFilter([
        timeFilter[0],
        Math.max(newValue[1], timeFilter[0] + 100 / 15),
      ]);
    }
  };

  return (
    <>
      <Stack spacing={1} sx={{ my: 2 }}>
        <FormGroup>
          <FormLabel id="search-label" sx={{ textAlign: 'left', mb: 1 }}>
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
        <FormGroup>
          <FormLabel id="time-filter">Time Filter</FormLabel>
          <Slider
            step={100 / 15}
            marks={times}
            value={timeFilter}
            onChange={handleTimeFilterChange}
          />
        </FormGroup>
      </Stack>
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
              <Stack spacing={1}>
                <Typography>{`${searchData.courseTitle} - ${searchData.term}`}</Typography>
                <LoadingButton
                  loading={btnIsLoading === 'add'}
                  variant="contained"
                  fullWidth
                  onClick={() => handleAddCourse()}
                >
                  Add this course
                </LoadingButton>
              </Stack>
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
