import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';

export default function TimetableCard({
  timetableIndex,
  timetable,
  handleAddFavourite,
  favTimetable,
  getMatchTimetable,
  setTimetableIndex,
  index,
}) {
  return (
    <Card
      sx={{
        my: 2,
        border:
          timetableIndex === index ? '3px solid #576066' : '3px solid white',
        transition: (theme) =>
          theme.transitions.create('border', {
            easing: theme.transitions.easing.easeInOut,
            duration: 200,
          }),
      }}
      key={index}
    >
      <CardActionArea
        onClick={() => {
          setTimetableIndex(index);
        }}
      >
        <CardContent sx={{ pt: 1, pb: 0 }}>
          <Box>
            {timetable.map((course) => (
              <Box key={course.courseCode} sx={{ textAlign: 'start' }}>
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
          {favTimetable && getMatchTimetable(timetable) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}
