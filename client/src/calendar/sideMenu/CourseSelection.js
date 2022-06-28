import React, { useEffect } from 'react';
import SearchBar from 'calendar/sideMenu/SearchBar';
import UserCourse from 'calendar/sideMenu/UserCourse';
import FadeContent from 'react-fade-in';
import SideMenuTitle from 'calendar/sideMenu/components/SideMenuTitle';
import { FadeIn } from 'react-slide-fade-in';
import { getUserCourse } from 'calendar/api/sideMenuApi';
import useSocket from 'context/socket';
import useCalendar from 'context/calendar';

export default function CourseSelection() {
  const { socket } = useSocket();
  const { userCourse } = useCalendar();

  useEffect(() => {
    getUserCourse(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FadeIn from={'right'} positionOffset={200} durationInMilliseconds={500}>
      <SideMenuTitle title={'Course Selection'} />
      <FadeContent delay={300}>
        <UserCourse userCourse={userCourse} />
        <SearchBar userCourse={userCourse} />
      </FadeContent>
    </FadeIn>
  );
}
