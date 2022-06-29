import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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

const FavTimetable = ({ favTimetable, timetableIndex, setTimetableIndex }) => {
  const { socket } = useSocket();

  useEffect(() => {
    getFavTimetable(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMatchTimetable = (tb) => {
    for (const t of favTimetable) {
      let allCourseMatch = true;
      for (let i = 0; i < t.length; i++) {
        if (
          !(
            tb[i]?.section?.sectionCode === t[i]?.section?.sectionCode &&
            tb[i]?.tutorial?.tutorialCode === t[i]?.tutorial?.tutorialCode
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
    const matchTb = getMatchTimetable(tb);
    console.log(tb);
    if (matchTb) {
      const filtered = favTimetable.filter((t) => t !== matchTb);
      console.log(filtered);
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
            favTimetable.map((timetable, i) => (
              <TimetableCard
                key={i}
                timetableIndex={timetableIndex}
                timetable={timetable}
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
          <Box sx={{ mt: '5rem' }}>
            <ClipLoader />
          </Box>
        )}
      </FadeContent>
    </FadeIn>
  );
};

export default FavTimetable;
