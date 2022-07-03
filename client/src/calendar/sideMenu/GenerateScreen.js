import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  getGenerateTimetable,
  getFavTimetable,
} from 'calendar/api/sideMenuApi';
import FadeContent from 'react-fade-in';
import useSocket from 'context/socket';
import { FadeIn } from 'react-slide-fade-in';
import TimetableCard from 'calendar/sideMenu/components/TimetableCard';
import SideMenuTitle from 'calendar/sideMenu/components/SideMenuTitle';
import useCalendar from 'context/calendar';
import LoadingButton from '@mui/lab/LoadingButton';
import ClipLoader from 'react-spinners/ClipLoader';

const GenerateScreen = ({ setTab }) => {
  const { generatedTimetable, timeElapsed } = useCalendar();
  const [pageCount, setPageCount] = useState(1);
  const hasMoreTimetable =
    generatedTimetable && pageCount * 10 < generatedTimetable.length;
  const { socket } = useSocket();

  useEffect(() => {
    !generatedTimetable && getGenerateTimetable(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFavTimetable(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FadeIn from="right" positionOffset={200} durationInMilliseconds={500}>
      <SideMenuTitle title={'Generated Timetables'} backTo={'term'} />
      <FadeContent delay={100} transitionDuration={400}>
        <Typography textAlign={'start'}>
          {' '}
          {generatedTimetable?.length > 0 &&
            timeElapsed &&
            `Generated ${generatedTimetable.length} timetables in ${timeElapsed} seconds`}
        </Typography>
        {generatedTimetable ? (
          generatedTimetable.length > 0 ? (
            generatedTimetable
              .slice(0, pageCount * 10)
              .map((tb, i) => (
                <TimetableCard key={tb._id} index={i} tb={tb} setTab={setTab} />
              ))
          ) : (
            <Typography sx={{ textAlign: 'start' }}>
              {' '}
              No generated timetables found! Try generating a new one
            </Typography>
          )
        ) : (
          <ClipLoader />
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
