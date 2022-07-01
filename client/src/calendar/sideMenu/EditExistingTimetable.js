import React from 'react';
import UserCourseSectionEdit from 'calendar/sideMenu/UserCourseSectionEdit';
import FadeContent from 'react-fade-in';
import { FadeIn } from 'react-slide-fade-in';
import SideMenuTitle from 'calendar/sideMenu/components/SideMenuTitle';

// highly similar to BuildTimetable, but came from an existing timetable
// Takes in current timetable

export default function EditExistingTimetable() {
  return (
    <FadeIn from={'right'} positionOffset={200} durationInMilliseconds={500}>
      <SideMenuTitle title={'Timetable Builder'} />
      <FadeContent delay={300}>
        <UserCourseSectionEdit />
      </FadeContent>
    </FadeIn>
  );
}
