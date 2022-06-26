import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  getGenerateTimetable,
  addFavTimetable,
  deleteFavTimetable,
  getFavTimetable,
} from 'calendar/api/sideMenuApi';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import useSocket from 'context/socket';
import FadeContent from 'react-fade-in';
import { FadeIn } from 'react-slide-fade-in';

const GenerateScreen = ({
  handleViewChange,
  generatedTimetable,
  setTimetableIndex,
}) => {
  const [timetableShow, setTimetableShow] = useState([]);
  const [favTimetable, setFavTimetable] = useState();
  const { socket } = useSocket();

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

  const handleExpandTimetable = (i) => {
    if (timetableShow.includes(i)) {
      setTimetableShow(timetableShow.filter((n) => n !== i));
    } else {
      setTimetableShow([...timetableShow, i]);
    }
  };

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
          sx={{ display: 'flex', textAlign: 'start', mb: 1 }}
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
          {generatedTimetable ? (
            generatedTimetable.map((timetable, i) => (
              <Box key={i}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button onClick={() => setTimetableIndex(i)}>
                    <Typography>Timetable {i}</Typography>
                  </Button>
                  <Box sx={{ marginLeft: 'auto' }}>
                    <IconButton
                      onClick={() => {
                        handleExpandTimetable(i);
                      }}
                    >
                      {timetableShow.includes(i) ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </IconButton>
                    <IconButton onClick={() => handleAddFavourite(timetable)}>
                      {favTimetable && favTimetable.includes(timetable) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <Collapse in={timetableShow.includes(i)}>
                  {timetable.map((course) => (
                    <Box
                      key={course.courseCode}
                      sx={{ textAlign: 'start', ml: 1 }}
                    >
                      <Typography sx={{ ml: 1 }}>
                        {course.courseCode}
                      </Typography>
                      <Typography sx={{ ml: 3 }}>
                        {course.section.sectionCode}
                      </Typography>
                      <Typography sx={{ ml: 3 }}>{course.tutorial}</Typography>
                    </Box>
                  ))}
                </Collapse>
              </Box>
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
