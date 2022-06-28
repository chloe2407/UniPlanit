import React, { useEffect, useState } from 'react';
import SearchBar from 'calendar/sideMenu/SearchBar';
import UserCourse from 'calendar/sideMenu/UserCourse';
import FadeContent from 'react-fade-in';
import SideMenuTitle from 'calendar/sideMenu/components/SideMenuTitle';
import { FadeIn } from 'react-slide-fade-in';
import { getUserCourse } from 'calendar/api/sideMenuApi';
import useSocket from 'context/socket';

export default function CourseSelection({ handleTabChange, handleViewChange }) {
  const { socket } = useSocket();
  const [userCourse, setUserCourse] = useState();

  useEffect(() => {
    getUserCourse(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('get user course', (userCourse) => {
      console.log(userCourse);
      setUserCourse(userCourse);
      // setUserCourse(userCourse);
    });
    return () => {
      socket.off('get user course');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FadeIn from={'right'} positionOffset={200} durationInMilliseconds={500}>
      <SideMenuTitle
        title={'Course Selection'}
        handleViewChange={handleViewChange}
      />
      <FadeContent delay={300}>
        <UserCourse userCourse={userCourse} />
        <SearchBar
          handleTabChange={handleTabChange}
          userCourse={userCourse}
          handleViewChange={handleViewChange}
        />
      </FadeContent>
    </FadeIn>
  );
}
