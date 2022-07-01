import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  deleteFavTimetable,
  addFavTimetable,
  getFavTimetable,
} from 'calendar/api/sideMenuApi';
import useSocket from 'context/socket';
import FadeContent from 'react-fade-in';
import { FadeIn } from 'react-slide-fade-in';
import ClipLoader from 'react-spinners/ClipLoader';
import TimetableCard from 'calendar/sideMenu/components/TimetableCard';

const FavTimetable = ({
  favTimetable,
  timetableIndex,
  setTimetableIndex,
  setTab,
}) => {
  const { socket } = useSocket();

  useEffect(() => {
    getFavTimetable(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const filtered = favTimetable.filter((t) => t !== matchTb);
      deleteFavTimetable(socket, filtered);
    } else {
      addFavTimetable(socket, tb);
    }
  };

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
              <TimetableCard
                key={i}
                tb={tb}
                isSaved={true}
                setTab={setTab}
                timetableIndex={timetableIndex}
                handleAddFavourite={handleAddFavourite}
                favTimetable={favTimetable}
                getMatchTimetable={getMatchTimetable}
                setTimetableIndex={setTimetableIndex}
                index={i}
              />
            ))
          ) : (
            <Typography sx={{ textAlign: 'start' }}>
              {' '}
              No generated timetables found! Try generating a new one
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
