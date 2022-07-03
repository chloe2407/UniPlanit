import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CourseSelection from 'calendar/sideMenu/CourseSelection';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from 'calendar/sideMenu/components/TabPanel';
import SideMenuStart from 'calendar/sideMenu/SideMenuStart';
import GenerateScreen from 'calendar/sideMenu/GenerateScreen';
import FavTimetable from 'calendar/sideMenu/FavTimetable';
import useCalendar from 'context/calendar';
import FriendSelect from 'calendar/sideMenu/FriendSelect';
import FriendFav from 'calendar/sideMenu/FriendFav';
import TermSelection from 'calendar/sideMenu/TermSelection';
import EditTimetable from 'calendar/sideMenu/EditTimetable';

export default function SideMenu({ drawerWidth }) {
  const [tab, setTab] = useState(0);
  const { view, setView, setTimetableIndex } = useCalendar();
  const [term, setTerm] = useState();

  const handleTabChange = (e, tab) => {
    setTab(tab);
    setTimetableIndex(0);
    if (tab === 0) setView('start');
    else if (tab === 1) setView('fav');
    else if (tab === 2) setView('select friend');
  };

  return (
    <Box
      sx={{
        width: `${drawerWidth}vw`,
        height: '100rem',
        p: 2,
      }}
    >
      <Tabs variant="scrollable" value={tab} onChange={handleTabChange}>
        <Tab value={0} label={'Build'} />
        <Tab value={1} label={'Favourites'} />
        <Tab value={2} label={"Friends' Timetables"} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        {view === 'start' ? (
          <SideMenuStart />
        ) : view === 'term' ? (
          <TermSelection setTerm={(term) => setTerm(term)} />
        ) : view === 'select' ? (
          <CourseSelection term={term} />
        ) : view === 'edit' ? (
          <EditTimetable />
        ) : view === 'generate' ? (
          <GenerateScreen setTab={(v) => setTab(v)} />
        ) : null}
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <FavTimetable setTab={(v) => setTab(v)} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        {view === 'select friend' ? (
          <FriendSelect />
        ) : view === 'friend fav' ? (
          <FriendFav />
        ) : null}
      </TabPanel>
    </Box>
  );
}
