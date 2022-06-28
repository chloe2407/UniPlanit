import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CourseSelection from 'calendar/sideMenu/CourseSelection';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from 'calendar/sideMenu/TabPanel';
import BuildTimetable from 'calendar/sideMenu/BuildTimetable';
import SideMenuStart from 'calendar/sideMenu/SideMenuStart';
import GenerateScreen from 'calendar/sideMenu/GenerateScreen';
import FavTimetable from 'calendar/sideMenu/FavTimetable';
import useCalendar from 'context/calendar';

export default function SideMenu({ drawerWidth }) {
  const [tab, setTab] = useState(0);
  const {
    view,
    setView,
    generatedTimetable,
    timetableIndex,
    favTimetable,
    setTimetableIndex,
  } = useCalendar();

  const handleTabChange = (e, tab) => {
    setTab(tab);
    if (tab === 1) setView('fav');
  };

  return (
    <Box
      sx={{
        width: `${drawerWidth}vw`,
        height: '100vh',
        p: 2,
      }}
    >
      <Tabs
        sx={{ ml: 3 }}
        variant="scrollable"
        value={tab}
        onChange={handleTabChange}
      >
        <Tab value={0} label={'Build'} />
        <Tab value={1} label={'Favorites'} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        {view === 'select' ? (
          <CourseSelection />
        ) : view === 'build' ? (
          <BuildTimetable />
        ) : view === 'generate' ? (
          <GenerateScreen
            favTimetable={favTimetable}
            generatedTimetable={generatedTimetable}
            timetableIndex={timetableIndex}
            setTimetableIndex={setTimetableIndex}
          />
        ) : (
          <SideMenuStart />
        )}
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <FavTimetable
          favTimetable={favTimetable}
          timetableIndex={timetableIndex}
          setTimetableIndex={setTimetableIndex}
        />
      </TabPanel>
    </Box>
  );
}
