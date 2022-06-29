import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';

import useSocket from 'context/socket';
import useFeedback from 'context/feedback';

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [timetable, setTimetable] = useState();
  const [view, setView] = useState('start');
  const [generatedTimetable, setGeneratedTimetable] = useState();
  const [favTimetable, setFavTimetable] = useState();
  const [buildTimetable, setBuildTimetable] = useState();
  const [timetableIndex, setTimetableIndex] = useState(0);
  const [userCourse, setUserCourse] = useState();

  const { socket } = useSocket();
  //   const { socket } = useSocket();
  const { setMsg } = useFeedback();

  const notifyUser = () => {
    setMsg({
      snackVariant: 'error',
      msg: "Sorry! We couldn't generate a timetable with the selected courses",
    });
  };

  useEffect(() => {
    socket.on('get user course', (userCourse) => {
      setUserCourse(userCourse);
    });
    return () => {
      socket.off('get user course');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('get generated timetable', (timetable) => {
      if (timetable?.length > 0) {
        setGeneratedTimetable(timetable);
        setTimetableIndex(0);
        setView('generate');
      } else {
        notifyUser();
      }
    });
    return () => {
      socket.off('get generated timetable');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('get build timetable', (timetable) => {
      setView('build');
      setBuildTimetable(timetable);
    });
    return () => {
      socket.off('get build timetable');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('get fav timetable', (timetable) => {
      setFavTimetable(timetable);
      setTimetableIndex(0);
    });
    return () => {
      socket.off('get fav timetable');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('update timetable', (timetable) => {
      setBuildTimetable(timetable);
    });
    return () => socket.off('update timetable');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (view === 'generate') {
      setTimetable(generatedTimetable && generatedTimetable[timetableIndex]);
    } else if (view === 'build') {
      setTimetable(buildTimetable && buildTimetable);
    } else if (view === 'fav') {
      console.log(favTimetable);
      setTimetable(favTimetable && favTimetable[timetableIndex]);
    } else {
      setTimetable(undefined);
    }
  }, [view, buildTimetable, generatedTimetable, favTimetable, timetableIndex]);

  const memo = useMemo(
    () => ({
      setView,
      view,
      userCourse,
      timetableIndex,
      setTimetableIndex,
      generatedTimetable,
      buildTimetable,
      favTimetable,
      timetable,
    }),
    [
      view,
      userCourse,
      generatedTimetable,
      buildTimetable,
      favTimetable,
      timetableIndex,
      timetable,
    ]
  );
  return (
    <CalendarContext.Provider value={memo}>{children}</CalendarContext.Provider>
  );
}

export default function useCalendar() {
  return useContext(CalendarContext);
}
