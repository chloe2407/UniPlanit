import React, { useState } from 'react';
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
import theme from 'theme/theme';
import useCalendar from 'context/calendar';
import CompareIcon from '@mui/icons-material/Compare';
import { StyledPopover } from 'globalComponents/navbar/NavbarMenu';

export default function TimetableCard({
  timetableIndex,
  tb,
  handleAddFavourite = null,
  favTimetable = null,
  getMatchTimetable = null,
  setTimetableIndex,
  index,
  isAuthor = true,
}) {
  const { setCurrentTimetableCompare, userFriend } = useCalendar();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        transition: (theme) =>
          theme.transitions.create(['border', 'transform'], {
            easing: theme.transitions.easing.easeInOut,
            duration: 200,
          }),
        ':hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Card
        sx={{
          pb: !favTimetable && 2,
          my: 2,
          color: 'white',
          backgroundColor: theme.palette.primary.main,
          // border:
          //   timetableIndex === index ? '3px solid #576066' : '3px solid black',
          transform: timetableIndex === index ? 'scale(1.05)' : 'scale(0.95)',
          transition: (theme) =>
            theme.transitions.create(['border', 'transform'], {
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
              {tb.timetable.map((course) => (
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

        {isAuthor && (
          <CardActions sx={{ my: 0, py: 0 }}>
            <IconButton onClick={() => handleAddFavourite(tb)}>
              {favTimetable && getMatchTimetable(tb.timetable) ? (
                <FavoriteIcon sx={{ color: 'white' }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: 'white' }} />
              )}
            </IconButton>
            <IconButton
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
                setCurrentTimetableCompare(tb);
              }}
            >
              <CompareIcon sx={{ color: 'white' }} />
            </IconButton>
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
                  <Typography>Compare With a FrNiend</Typography>
                </strong>
                {userFriend ? (
                  userFriend.map((friend) => (
                    <Box key={friend._id} sx={{ my: 1 }}>
                      <Typography>{`${friend.first} ${friend.last}`}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>Your friends will show up here</Typography>
                )}
              </Box>
            </StyledPopover>
          </CardActions>
        )}
      </Card>
    </Box>
  );
}
