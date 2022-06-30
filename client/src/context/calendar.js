import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';

import useSocket from 'context/socket';
import useFeedback from 'context/feedback';
import { getUserFriend } from 'calendar/api/sideMenuApi';

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [timetable, setTimetable] = useState();
  const [view, setView] = useState('start');
  const [generatedTimetable, setGeneratedTimetable] = useState();
  const [favTimetable, setFavTimetable] = useState();
  const [buildTimetable, setBuildTimetable] = useState();
  const [timetableIndex, setTimetableIndex] = useState(0);
  const [currentTimetableCompare, setCurrentTimetableCompare] = useState();
  const [userCourse, setUserCourse] = useState();
  const [userFriend, setUserFriend] = useState();
  const [currentFriend, setCurrentFriend] = useState();
  const { socket } = useSocket();
  const { setMsg } = useFeedback();

  const notifyUser = () => {
    setMsg({
      snackVariant: 'error',
      msg: "Sorry! We couldn't generate a timetable with the selected courses",
    });
  };

  useEffect(() => {
    getUserFriend(socket);
  }, []);

  useEffect(() => {
    socket.on('get user course', (userCourse) => {
      // console.log(userCourse)
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
      console.log(timetable);
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
      console.log(timetable);
      setBuildTimetable(timetable);
    });
    return () => socket.off('update timetable');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (view === 'generate') {
      setTimetable(
        generatedTimetable && generatedTimetable[timetableIndex].timetable
      );
    } else if (view === 'build') {
      console.log(buildTimetable);
      setTimetable(buildTimetable && buildTimetable.timetable);
    } else if (view === 'fav') {
      console.log(favTimetable);
      setTimetable(
        favTimetable &&
          favTimetable.length > 0 &&
          favTimetable[timetableIndex].timetable
      );
    } else if (view === 'friend fav') {
      setTimetable(
        currentFriend.favoritedTimetables &&
          currentFriend.favoritedTimetables.length > 0 &&
          currentFriend.favoritedTimetables[timetableIndex].timetable
      );
    } else {
      setTimetable(undefined);
    }
  }, [view, buildTimetable, generatedTimetable, favTimetable, timetableIndex]);

  useEffect(() => {
    socket.on('get user friend', (userFriend) => {
      setUserFriend(userFriend);
    });
    return () => socket.off('get user friend');
  }, []);

  const memo = useMemo(
    () => ({
      setView,
      view,
      userCourse,
      timetableIndex,
      setTimetableIndex,
      generatedTimetable,
      buildTimetable,
      userFriend,
      currentFriend,
      setCurrentFriend,
      currentTimetableCompare,
      setCurrentTimetableCompare,
      favTimetable,
      timetable,
    }),
    [
      view,
      userCourse,
      generatedTimetable,
      currentFriend,
      currentTimetableCompare,
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
