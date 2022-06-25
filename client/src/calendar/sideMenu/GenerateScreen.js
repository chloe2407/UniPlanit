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
import { getGenerateTimetable } from 'calendar/api/sideMenuApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import useSocket from 'context/socket';

const GenerateScreen = ({
  handleViewChange,
  generatedTimetable,
  setTimetableIndex,
}) => {
  const [timetableShow, setTimetableShow] = useState([]);
  const { socket } = useSocket();
  const [on, setOn] = useState();

  useEffect(() => {
    getGenerateTimetable(socket);
  }, []);

  const handleExpandTimetable = (i) => {
    if (timetableShow.includes(i)) {
      setTimetableShow(timetableShow.filter((n) => n !== i));
    } else {
      setTimetableShow([...timetableShow, i]);
    }
  };

  const handleAddFavourite = () => {
    setOn(!on);
  };

  return (
    <Box mt={2} sx={{ m: 3 }}>
      <Typography
        variant="h5"
        sx={{ display: 'flex', textAlign: 'start', mb: 1 }}
      >
        Generated Timetables
        <IconButton
          sx={{
            ml: 'auto ',
            // transform: !openDrawer && 'rotate(90deg)',
            // transition: (theme) =>
            //   theme.transitions.create('transform', {
            //     easing: theme.transitions.easing.sharp,
            //     duration: 225,
            //   }),
          }}
          onClick={() => handleViewChange(null, 'start')}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </Typography>

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
                  {timetableShow.includes(i) ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <IconButton onClick={() => handleAddFavourite()}>
                  {on ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
            </Box>
            <Collapse in={timetableShow.includes(i)}>
              {timetable.map((course) => (
                <Box key={course.courseCode} sx={{ textAlign: 'start', ml: 1 }}>
                  <Typography sx={{ ml: 1 }}>{course.courseCode}</Typography>
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
        <Typography>
          {' '}
          No generated timetables found! Try generating a new one
        </Typography>
      )}
    </Box>
  );
};

export default GenerateScreen;
