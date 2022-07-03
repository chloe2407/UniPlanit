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
  getMultipleCourse,
  updateFavTimetable,
  deleteFavTimetable,
  addFavTimetable,
} from 'calendar/api/sideMenuApi';
import useCalendar from 'context/calendar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ClipLoader from 'react-spinners/ClipLoader';
import CompareIcon from '@mui/icons-material/Compare';
import { StyledPopover } from 'navbar/NavbarMenu';
import NavbarTooltip from 'navbar/NavbarTooltip';
import Button from '@mui/material/Button';

export default function UserCourseSectionEdit() {
  const [courseCodeShow, setCourseCodeShow] = useState([]);
  const [userCourseObj, setUserCourseObj] = useState();
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElB, setAnchorElB] = useState(null);
  const [currentFriend, setCurrentFriend] = useState();
  const [friendTimetableSelected, setFriendTimetableSelected] = useState([]);

  const open = Boolean(anchorEl);
  const openB = Boolean(anchorElB);

  const {
    userFriend,
    currentSelectedTimetable,
    setCurrentSelectedTimetable,
    favTimetable,
    timetablesCompare,
    setTimetablesCompare,
  } = useCalendar();
  const [nameValue, setNameValue] = useState(
    currentSelectedTimetable?.name || 'Name this timetable'
  );
  const { socket } = useSocket();
  const termToString = {
    F: 'Fall',
    S: 'Winter',
  };

  // get info of each course in current timetable
  // if the timetable is favorited, change in user.favoritedTimetables to save it
  useEffect(() => {
    const promises = getMultipleCourse(currentSelectedTimetable.timetable);
    Promise.all(promises).then((data) => {
      // turn user course into objects
      const userCourseObj = data.reduce((acc, curr) => {
        acc[curr.courseCode] = curr;
        return acc;
      }, {});
      setUserCourseObj(userCourseObj);
    });
  }, []);

  useEffect(() => {
    setBtnIsLoading(null);
  }, [favTimetable]);

  // add section/tutorials to a course in the current timetable

  const handleUpdateTimetable = (courseCode, type, sectionCode) => {
    setCurrentSelectedTimetable({
      ...currentSelectedTimetable,
      timetable: currentSelectedTimetable.timetable.map((course) => {
        if (course.courseCode === courseCode) {
          if (type === 'lec') {
            userCourseObj[courseCode].sections.forEach((section) => {
              if (section.sectionCode === sectionCode) {
                course.section = section;
              }
            });
          } else if (type === 'tut') {
            userCourseObj[courseCode].tutorials.forEach((tutorial) => {
              if (tutorial.tutorialCode === sectionCode) {
                course.tutorial = tutorial;
              }
            });
          }
        }
        return course;
      }),
    });
  };

  const handleCourseCollapse = (courseCode) => {
    courseCodeShow.includes(courseCode)
      ? setCourseCodeShow([...courseCodeShow.filter((c) => c !== courseCode)])
      : setCourseCodeShow([...courseCodeShow, courseCode]);
  };

  const handleClearAllSections = () => {
    setCurrentSelectedTimetable({
      ...currentSelectedTimetable,
      timetable: currentSelectedTimetable.timetable.map((course) => {
        course.tutorial = null;
        course.section = null;
        return course;
      }),
    });
  };

  const handleSelectFriendTimetable = (friend, friendTimetable) => {
    // if timetable includes friendTimetable, remove it
    if (friendTimetableSelected.includes(friendTimetable._id)) {
      setFriendTimetableSelected(
        friendTimetableSelected.filter((tbId) => tbId !== friendTimetable._id)
      );
      // console.log(timetablesCompare);
      setTimetablesCompare(
        timetablesCompare.filter(
          (timetable) => timetable._id !== friendTimetable._id
        )
      );
    } else {
      // otherwise, add it
      setFriendTimetableSelected([
        ...friendTimetableSelected,
        friendTimetable._id,
      ]);
      setTimetablesCompare([
        ...timetablesCompare,
        {
          owner: `${friend.first} ${friend.last}`,
          ownerInitial: `${friend.first[0]}${friend.last[0]}`,
          timetable: friendTimetable.timetable,
          _id: friendTimetable._id,
        },
      ]);
    }
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

  const handleSaveTimetable = () => {
    setBtnIsLoading(true);
    const matchTb = getMatchTimetable(currentSelectedTimetable.timetable);
    if (matchTb) {
      updateFavTimetable(socket, currentSelectedTimetable);
    } else {
      addFavTimetable(socket, currentSelectedTimetable);
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
                handleUpdateTimetable(courseCode, 'lec', e.target.value);
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
              handleUpdateTimetable(courseCode, 'tut', e.target.value);
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
          <NavbarTooltip
            title={
              <Typography>Compare this timetable with a friend</Typography>
            }
          >
            <IconButton
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
                setCurrentSelectedTimetable(currentSelectedTimetable);
              }}
            >
              <CompareIcon />
            </IconButton>
          </NavbarTooltip>
          <StyledPopover
            sx={{
              '& .MuiPopover-paper': {
                backgroundColor: 'gray',
              },
            }}
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <Box sx={{ p: 2 }}>
              <strong>
                <Typography>Compare With a Friend</Typography>
              </strong>
              {userFriend ? (
                userFriend.map((friend) => (
                  <Box key={friend._id} sx={{ my: 1 }}>
                    <Button
                      sx={{
                        width: '100%',
                        color: 'white',
                        justifyContent: 'start',
                      }}
                      onClick={(e) => {
                        setCurrentFriend(friend._id);
                        setAnchorElB(e.currentTarget);
                      }}
                    >
                      <Typography>{`${friend.first} ${friend.last}`}</Typography>
                    </Button>
                    {friend._id === currentFriend && (
                      <StyledPopover
                        sx={{
                          '& .MuiPopover-paper': {
                            backgroundColor: 'gray',
                          },
                        }}
                        open={openB}
                        anchorEl={anchorElB}
                        onClose={() => {
                          setCurrentFriend(null);
                          setAnchorElB(null);
                        }}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                      >
                        <Box sx={{ p: 2 }}>
                          {friend.favoritedTimetables?.length > 0 ? (
                            friend.favoritedTimetables.map(
                              (friendTimetable) => (
                                <Box key={friendTimetable._id} sx={{ my: 1 }}>
                                  <Button
                                    sx={{
                                      width: '100%',
                                      color: 'white',
                                      justifyContent: 'start',
                                    }}
                                    onClick={() =>
                                      handleSelectFriendTimetable(
                                        friend,
                                        friendTimetable
                                      )
                                    }
                                  >
                                    <Typography>
                                      {`${friendTimetable.name}-${
                                        termToString[friendTimetable.term]
                                      }`}
                                    </Typography>
                                    {friendTimetableSelected.includes(
                                      friendTimetable._id
                                    ) && <CheckIcon sx={{ ml: 2 }} />}
                                  </Button>
                                </Box>
                              )
                            )
                          ) : (
                            <Typography>No Timetables</Typography>
                          )}
                        </Box>
                      </StyledPopover>
                    )}
                  </Box>
                ))
              ) : (
                <Typography>Your friends will show up here</Typography>
              )}
            </Box>
          </StyledPopover>
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
      <Stack sx={{ mt: 2 }} spacing={1}>
        <LoadingButton
          loading={btnIsLoading}
          variant={'contained'}
          onClick={() => handleSaveTimetable(currentSelectedTimetable)}
        >
          Save to Favourites
        </LoadingButton>
        <LoadingButton
          // loading={isLoading}
          loading={false}
          variant={'contained'}
          onClick={() => handleClearAllSections()}
        >
          Clear all sections
        </LoadingButton>
      </Stack>
    </>
  );
}
