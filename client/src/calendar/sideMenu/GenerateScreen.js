import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  getGenerateTimetable,
  addFavTimetable,
  deleteFavTimetable,
  getFavTimetable,
} from 'calendar/api/sideMenuApi';
import useSocket from 'context/socket';
import FadeContent from 'react-fade-in';
import { FadeIn } from 'react-slide-fade-in';
import TimetableCard from 'calendar/sideMenu/components/TimetableCard';
import SideMenuTitle from 'calendar/sideMenu/components/SideMenuTitle';

const GenerateScreen = ({
  handleViewChange,
  generatedTimetable,
  favTimetable,
  timetableIndex,
  setTimetableIndex,
}) => {
  const [generateTime, setGenerateTime] = useState();
  const { socket } = useSocket();

  useEffect(() => {
    socket.on('time elpased', (time) => {
      setGenerateTime(time);
    });
    return () => socket.off('time elpased');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getGenerateTimetable(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFavTimetable(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check tb against timetables in favTimetable and return the match
  const getMatchTimetable = (tb) => {
    for (const t of favTimetable) {
      let allCourseMatch = true;
      for (let i = 0; i < t.length; i++) {
        if (
          !(
            tb[i].section?.sectionCode === t[i].section?.sectionCode &&
            tb[i].tutorial?.tutorialCode === t[i].tutorial?.tutorialCode
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
      <SideMenuTitle
        title={'Generated Timetables'}
        handleViewChange={handleViewChange}
      />
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
            <TimetableCard
              timetable={timetable}
              timetableIndex={timetableIndex}
              handleAddFavourite={handleAddFavourite}
              favTimetable={favTimetable}
              getMatchTimetable={getMatchTimetable}
              index={i}
              setTimetableIndex={setTimetableIndex}
            />
          ))
        ) : (
          <Typography sx={{ textAlign: 'start' }}>
            {' '}
            No generated timetables found! Try generating a new one
          </Typography>
        )}
      </FadeContent>
    </FadeIn>
  );
};

export default GenerateScreen;
