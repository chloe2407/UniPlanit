import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getFavTimetable } from 'calendar/api/sideMenuApi';
import useSocket from 'context/socket';
import FadeContent from 'react-fade-in';
import { FadeIn } from 'react-slide-fade-in';
import ClipLoader from 'react-spinners/ClipLoader';
import TimetableCard from 'calendar/sideMenu/components/TimetableCard';
import useCalendar from 'context/calendar';

const FavTimetable = ({ setTab }) => {
  const { socket } = useSocket();
  const { favTimetable } = useCalendar();

  useEffect(() => {
    getFavTimetable(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FadeIn from="right" positionOffset={200} durationInMilliseconds={500}>
      <Typography
        variant="h5"
        sx={{ display: 'flex', textAlign: 'start', alignItems: 'center' }}
      >
        Favorited Timetables
      </Typography>
      <FadeContent delay={100} transitionDuration={400}>
        {favTimetable ? (
          favTimetable.length > 0 ? (
            favTimetable.map((tb, i) => (
              <TimetableCard key={tb._id} index={i} tb={tb} setTab={setTab} />
            ))
          ) : (
            <Typography sx={{ textAlign: 'start' }}>
              {' '}
              No favorited timetables found! Try generating a new one
            </Typography>
          )
        ) : (
          <Container sx={{ transform: 'scale(0.6)' }}>
            <ClipLoader />
          </Container>
        )}
      </FadeContent>
    </FadeIn>
  );
};

export default FavTimetable;
