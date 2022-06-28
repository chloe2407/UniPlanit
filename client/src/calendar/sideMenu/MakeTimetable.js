import React from 'react';
import UserCourseSectionSelect from 'calendar/sideMenu/UserCourseSectionSelect';
import FadeContent from 'react-fade-in';
import { FadeIn } from 'react-slide-fade-in';
import SideMenuTitle from 'calendar/sideMenu/components/SideMenuTitle';

export default function MakeTimetable({ handleViewChange, buildTimetable }) {
  return (
    <FadeIn from={'right'} positionOffset={200} durationInMilliseconds={500}>
      <SideMenuTitle
        title={'Timetable Builder'}
        handleViewChange={handleViewChange}
      />
      <FadeContent delay={300}>
        <UserCourseSectionSelect userCourse={buildTimetable} />
      </FadeContent>
    </FadeIn>
  );
}
