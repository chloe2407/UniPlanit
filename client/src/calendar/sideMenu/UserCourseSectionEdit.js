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
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {
  updateSelectedTimetable,
  getMultipleCourse,
  updateFavTimetable,
  deleteFavTimetable,
  addFavTimetable,
  getFavTimetable,
} from 'calendar/api/sideMenuApi';
import useCalendar from 'context/calendar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ClipLoader from 'react-spinners/ClipLoader';

export default function UserCourseSectionEdit() {
  const [courseCodeShow, setCourseCodeShow] = useState([]);
  const [userCourseObj, setUserCourseObj] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const { currentSelectedTimetable, favTimetable } = useCalendar();
  const [nameValue, setNameValue] = useState(
    currentSelectedTimetable.name || 'Name this timetable'
  );
  const { socket } = useSocket();

  const termToString = {
    F: 'Fall',
    S: 'Winter',
  };

  // get info of each course in current timetable
  // if the timetable is favorited, change in user.favoritedTimetables to save it
  useEffect(() => {
    console.log(currentSelectedTimetable.timetable);
    const promises = getMultipleCourse(currentSelectedTimetable.timetable);
    Promise.all(promises).then((data) => {
      // turn user course into objects
      const userCourseObj = data.reduce((acc, curr) => {
        acc[curr.courseCode] = curr;
        return acc;
      }, {});
      setUserCourseObj(userCourseObj);
    });
  }, [currentSelectedTimetable]);

  // add section/tutorials to a course in the current timetable
  const handleAddCourseWithSection = (courseCode, type, sectionCode) => {
    currentSelectedTimetable.timetable.forEach((course) => {
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
    if (currentSelectedTimetable.isSaved) {
      updateFavTimetable(socket, currentSelectedTimetable);
    }
    updateSelectedTimetable(socket, currentSelectedTimetable);
  };

  const handleCourseCollapse = (courseCode) => {
    courseCodeShow.includes(courseCode)
      ? setCourseCodeShow([...courseCodeShow.filter((c) => c !== courseCode)])
      : setCourseCodeShow([...courseCodeShow, courseCode]);
  };

  const handleClearAllSections = () => {
    setIsLoading(true);
    updateSelectedTimetable(socket, null, true);
  };

  const getCurrentLecture = (courseCode) => {
    const currentLecture = currentSelectedTimetable.timetable.find((course) => {
      return course.courseCode === courseCode;
    }).section?.sectionCode;
    return currentLecture;
  };

  const getCurrentTutorial = (courseCode) => {
    const currentTutorial = currentSelectedTimetable.timetable.find(
      (course) => {
        return course.courseCode === courseCode;
      }
    ).tutorial?.tutorialCode;
    return currentTutorial;
  };

  const handleSaveName = () => {
    setIsEditing(false);
    currentSelectedTimetable.name = nameValue;
    if (currentSelectedTimetable.isSaved) {
      updateFavTimetable(socket, currentSelectedTimetable);
    }
  };

  // will refractor this, in FavTimetable and GenerateTimetable
  const getMatchTimetable = (tb) => {
    for (const t of favTimetable) {
      let allCourseMatch = true;
      for (let i = 0; i < t.timetable.length; i++) {
        if (
          !(
            tb[i]?.section?.sectionCode ===
              t.timetable[i]?.section?.sectionCode &&
            tb[i]?.tutorial?.tutorialCode ===
              t.timetable[i]?.tutorial?.tutorialCode
          )
        ) {
          allCourseMatch = false;
        }
      }
      if (allCourseMatch) {
        return t;
      }
    }
  };

  const handleAddFavourite = (tb) => {
    // timetable matched
    const matchTb = getMatchTimetable(tb.timetable);
    if (matchTb) {
      currentSelectedTimetable.isSaved = false;
      const filtered = favTimetable.filter((t) => t !== matchTb);
      deleteFavTimetable(socket, filtered);
    } else {
      currentSelectedTimetable.isSaved = true;
      addFavTimetable(socket, tb);
    }
  };

  const SelectLecture = ({ courseCode }) => {
    const currentLecture = getCurrentLecture(courseCode);
    const [lecture, setLecture] = useState(
      currentLecture ? currentLecture : 'Choose a Lecture'
    );
    return userCourseObj ? (
      userCourseObj && userCourseObj[courseCode]?.sections?.length > 0 ? (
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
        <ClipLoader />
      )
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
      <Stack
        direction="row"
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          mb: 1,
        }}
      >
        <TextField
          value={nameValue}
          disabled={!isEditing}
          onChange={(e) => setNameValue(e.target.value)}
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '1.3rem !important',
            },
            '& .Mui-disabled': {
              WebkitTextFillColor: 'black !important',
              opacity: 1,
              fontSize: '1.3rem',
              border: 'none',
            },
          }}
          variant="standard"
        />
        <Box display="inline-flex">
          <IconButton
            onClick={
              isEditing ? () => handleSaveName() : () => setIsEditing(true)
            }
          >
            {isEditing ? <CheckIcon /> : <EditIcon />}
          </IconButton>
          <IconButton>
            <EventNoteIcon />
          </IconButton>
          <IconButton
            onClick={() => handleAddFavourite(currentSelectedTimetable)}
          >
            {currentSelectedTimetable.isSaved ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>
      </Stack>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {' '}
        {termToString[currentSelectedTimetable.term]}
      </Typography>
      {currentSelectedTimetable &&
      currentSelectedTimetable.timetable.length > 0 ? (
        currentSelectedTimetable.timetable.map((course) => (
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
        sx={{ textTransform: 'capitalize', mt: 1 }}
        onClick={() => handleClearAllSections()}
      >
        Clear all sections
      </LoadingButton>
    </>
  );
}
