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
import useAuth from 'context/auth';

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [timetable, setTimetable] = useState();
  const [view, setView] = useState('start');
  const [generatedTimetable, setGeneratedTimetable] = useState();
  const [favTimetable, setFavTimetable] = useState([]);
  const [timetableIndex, setTimetableIndex] = useState(0);
  const [currentSelectedTimetable, setCurrentSelectedTimetable] = useState();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timetablesCompare, setTimetablesCompare] = useState([]);
  const [nextPage, setNextPage] = useState();
  const [userCourse, setUserCourse] = useState();
  const [userFriend, setUserFriend] = useState();
  const [currentFriend, setCurrentFriend] = useState();
  const { user } = useAuth();
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
      setUserCourse(userCourse);
    });
    return () => {
      socket.off('get user course');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('get generated timetable', (timetable, timeElapsed) => {
      if (timetable?.length > 0) {
        setGeneratedTimetable(timetable);
        setTimeElapsed(timeElapsed);
        setTimetableIndex(0);
        if (nextPage && nextPage !== view) {
          setView(nextPage);
          setNextPage(null);
        }
      } else {
        notifyUser();
      }
    });
    return () => {
      socket.off('get generated timetable');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPage]);

  useEffect(() => {
    socket.on('get fav timetable', (timetable) => {
      setFavTimetable(timetable);
    });
    return () => {
      socket.off('get fav timetable');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('update selected timetable', (timetable) => {
      setCurrentSelectedTimetable(timetable);
      if (nextPage && nextPage !== view) {
        setView(nextPage);
        setNextPage(null);
      }
    });
    return () => socket.off('update selected timetable');
  }, [nextPage]);

  useEffect(() => {
    currentSelectedTimetable &&
      setTimetablesCompare([
        {
          owner: `${user.first}${user.last}`,
          ownerInitial: `${user.first[0]}${user.last[0]}`,
          timetable: currentSelectedTimetable.timetable,
        },
      ]);
  }, [currentSelectedTimetable]);

  useEffect(() => {
    // want a list of all courses in all the timetable in timetablesCompare
    const timetable = [];
    timetablesCompare.forEach((t) => {
      t.timetable.forEach((course) => {
        timetable.push({
          ...course,
          owner: t.owner,
          ownerInitial: t.ownerInitial,
        });
      });
    });
    setTimetable(timetable);
  }, [timetablesCompare]);

  useEffect(() => {
    if (view === 'generate') {
      setTimetable(
        generatedTimetable && generatedTimetable[timetableIndex].timetable
      );
    } else if (view === 'edit') {
      setTimetable(currentSelectedTimetable?.timetable);
    } else if (view === 'fav') {
      console.log(favTimetable);
      setTimetable(
        favTimetable?.length > 0 && favTimetable[timetableIndex].timetable
      );
    } else if (view === 'friend fav') {
      setTimetable(
        currentFriend?.favoritedTimetables?.length > 0 &&
          currentFriend.favoritedTimetables[timetableIndex].timetable
      );
    } else {
      setTimetable(undefined);
    }
  }, [view, favTimetable, timetableIndex]);

  useEffect(() => {
    socket.on('get user friend', (userFriend) => {
      setUserFriend(userFriend);
    });
    return () => socket.off('get user friend');
  }, []);

  // console.log(currentSelectedTimetable)

  const memo = useMemo(
    () => ({
      setView,
      view,
      userCourse,
      timetableIndex,
      setTimetableIndex,
      generatedTimetable,
      timetablesCompare,
      setTimetablesCompare,
      currentSelectedTimetable,
      timeElapsed,
      userFriend,
      setNextPage,
      currentFriend,
      setCurrentFriend,
      currentSelectedTimetable,
      setCurrentSelectedTimetable,
      setFavTimetable,
      favTimetable,
      timetable,
    }),
    [
      view,
      userCourse,
      generatedTimetable,
      currentFriend,
      currentSelectedTimetable,
      currentSelectedTimetable,
      favTimetable,
      timetableIndex,
      timetable,
      nextPage,
      timetablesCompare,
    ]
  );
  return (
    <CalendarContext.Provider value={memo}>{children}</CalendarContext.Provider>
  );
}

export default function useCalendar() {
  return useContext(CalendarContext);
}
