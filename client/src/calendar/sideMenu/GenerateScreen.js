import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  getGenerateTimetable,
  addFavTimetable,
  deleteFavTimetable,
  getFavTimetable,
} from 'calendar/api/sideMenuApi';
import FadeContent from 'react-fade-in';
import useSocket from 'context/socket';
import { FadeIn } from 'react-slide-fade-in';
import TimetableCard from 'calendar/sideMenu/components/TimetableCard';
import SideMenuTitle from 'calendar/sideMenu/components/SideMenuTitle';
import useCalendar from 'context/calendar';
import LoadingButton from '@mui/lab/LoadingButton';

const GenerateScreen = ({
  generatedTimetable,
  favTimetable,
  timetableIndex,
  setTimetableIndex,
}) => {
  const [generateTime, setGenerateTime] = useState();
  const [pageCount, setPageCount] = useState(1);
  const hasMoreTimetable =
    generatedTimetable && pageCount * 10 < generatedTimetable.length;
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
      <SideMenuTitle title={'Generated Timetables'} backTo={'start'} />
      <FadeContent delay={100} transitionDuration={400}>
        <Typography textAlign={'start'}>
          {' '}
          {generatedTimetable?.length > 0 &&
            generateTime &&
            `Generated ${generatedTimetable.length} timetables in ${generateTime} seconds`}
        </Typography>
        {generatedTimetable ? (
          generatedTimetable
            .slice(0, pageCount * 10)
            .map((tb, i) => (
              <TimetableCard
                key={i}
                tb={tb}
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
        {hasMoreTimetable ? (
          <LoadingButton
            sx={{ mb: 5 }}
            variant={'contained'}
            onClick={() => {
              setPageCount(pageCount + 1);
            }}
          >
            Get more
          </LoadingButton>
        ) : (
          <Typography>That's all we have!</Typography>
        )}
      </FadeContent>
    </FadeIn>
  );
};

export default GenerateScreen;
