import React, { useEffect } from 'react';
import SearchBar from 'calendar/sideMenu/components/SearchBar';
import UserCourse from 'calendar/sideMenu/components/UserCourse';
import FadeContent from 'react-fade-in';
import SideMenuTitle from 'calendar/sideMenu/components/SideMenuTitle';
import { FadeIn } from 'react-slide-fade-in';
import { getUserCourse } from 'calendar/api/sideMenuApi';
import useSocket from 'context/socket';
import useCalendar from 'context/calendar';

export default function CourseSelection({ term }) {
  const { socket } = useSocket();
  const { userCourse } = useCalendar();
  useEffect(() => {
    // console.log('Getting user courses')
    getUserCourse(socket, term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FadeIn from={'right'} positionOffset={200} durationInMilliseconds={500}>
      <SideMenuTitle title={`Course Selection - ${term}`} backTo={'term'} />
      <FadeContent delay={300}>
        <UserCourse term={term} userCourse={userCourse} />
        <SearchBar term={term} userCourse={userCourse} />
      </FadeContent>
    </FadeIn>
  );
}
