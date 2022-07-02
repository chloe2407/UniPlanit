import Typography from '@mui/material/Typography';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import theme from 'theme/theme';
import Stack from '@mui/material/Stack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useCalendar from 'context/calendar';

export default function FriendCard({ friendInfo }) {
  // collapse show friend timetables
  const { setView, setCurrentFriend } = useCalendar();
  return (
    <Card
      sx={{
        px: 2,
        mb: 1,
        color: 'white',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography> {`${friendInfo.first} ${friendInfo.last}`}</Typography>
        <CardActions>
          <IconButton
            sx={{ px: 0, mx: 0, color: theme.palette.secondary.main }}
            onClick={() => {
              setView('friend fav');
              setCurrentFriend(friendInfo);
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </CardActions>
      </Stack>
    </Card>
  );
}
