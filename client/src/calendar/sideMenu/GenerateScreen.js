import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  getGenerateTimetable,
  addFavTimetable,
  deleteFavTimetable,
  getFavTimetable,
} from 'calendar/api/sideMenuApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import useSocket from 'context/socket';
import FadeContent from 'react-fade-in';
import { FadeIn } from 'react-slide-fade-in';

const GenerateScreen = ({
  handleViewChange,
  generatedTimetable,
  timetableIndex,
  setTimetableIndex,
}) => {
  const [favTimetable, setFavTimetable] = useState();
  const [generateTime, setGenerateTime] = useState();
  const { socket } = useSocket();

  useEffect(() => {
    socket.on('time elpased', (time) => {
      setGenerateTime(time);
    });
    return () => socket.off('time elpased');
  }, []);

  useEffect(() => {
    getGenerateTimetable(socket);
  }, []);

  useEffect(() => {
    getFavTimetable(socket);
  }, []);

  useEffect(() => {
    socket.on('get fav timetable', (tb) => {
      console.log(tb);
      setFavTimetable(tb);
    });
    return () => socket.off('get fav timetable');
  }, []);

  const handleAddFavourite = (tb) => {
    console.log(tb);
    // favTimetable && console.log(favTimetable);
    // if (favTimetable.includes(tb)) {
    //   deleteFavTimetable(socket, tb)
    // } else {
    //   addFavTimetable(socket, tb);
    // }
  };

  return (
    <FadeIn from="right" positionOffset={200} durationInMilliseconds={500}>
      <Box mt={2} sx={{ m: 3 }}>
        <Typography
          variant="h5"
          sx={{ display: 'flex', textAlign: 'start', alignItems: 'center' }}
        >
          Generated Timetables
          <IconButton
            sx={{
              ml: 'auto ',
            }}
            onClick={() => handleViewChange(null, 'start')}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Typography>
        <FadeContent delay={100} transitionDuration={400}>
          <Typography textAlign={'start'}>
            {' '}
            {generateTime &&
              `Generated ${
                generatedTimetable && generatedTimetable.length
              } timetables in ${generateTime} seconds`}
          </Typography>
          {generatedTimetable ? (
            generatedTimetable.map((timetable, i) => (
              <Card
                sx={{
                  my: 2,
                  border:
                    timetableIndex === i
                      ? '2px solid black'
                      : '2px solid white',
                  transition: (theme) =>
                    theme.transitions.create('border', {
                      easing: theme.transitions.easing.easeInOut,
                      duration: 200,
                    }),
                }}
                key={i}
              >
                <CardActionArea
                  onClick={() => {
                    setTimetableIndex(i);
                  }}
                >
                  <CardContent sx={{ pt: 1, pb: 0 }}>
                    <Box>
                      {timetable.map((course) => (
                        <Box
                          key={course.courseCode}
                          sx={{ textAlign: 'start' }}
                        >
                          <Stack direction={'row'}>
                            <Typography sx={{}}>{course.courseCode}</Typography>
                            <Typography sx={{ ml: 'auto' }}>
                              {course.section.sectionCode}
                            </Typography>
                            <Typography>{course.tutorial}</Typography>
                          </Stack>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </CardActionArea>

                <CardActions sx={{ my: 0, py: 0 }}>
                  <IconButton onClick={() => handleAddFavourite(timetable)}>
                    {favTimetable && favTimetable.includes(timetable) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography sx={{ textAlign: 'start' }}>
              {' '}
              No generated timetables found! Try generating a new one
            </Typography>
          )}
        </FadeContent>
      </Box>
    </FadeIn>
  );
};

export default GenerateScreen;
