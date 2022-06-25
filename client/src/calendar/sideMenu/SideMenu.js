import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import useSocket from 'context/socket';
import { getUserCourse } from 'calendar/api/sideMenuApi';
import CourseSelection from 'calendar/sideMenu/CourseSelection';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from 'calendar/sideMenu/TabPanel';
import MakeTimetable from 'calendar/sideMenu/MakeTimetable';
import SideMenuStart from 'calendar/sideMenu/SideMenuStart';
import GenerateScreen from 'calendar/sideMenu/GenerateScreen';

export default function SideMenu({
  drawerWidth,
  buildTimetable,
  generatedTimetable,
  view,
  handleViewChange,
  setTimetableIndex,
}) {
  const [userCourse, setUserCourse] = useState();
  const [tab, setTab] = useState(0);
  const { socket } = useSocket();
  useEffect(() => {
    getUserCourse(socket);
  }, []);

  useEffect(() => {
    socket.on('get user course', (userCourse) => {
      setUserCourse(userCourse);
    });
    return () => {
      socket.off('get user course');
    };
  }, []);
  const handleTabChange = (e, tab) => {
    setTab(tab);
  };
  return (
    <Box
      sx={{
        width: `${drawerWidth}vw`,
        height: '100vh',
        p: 2,
      }}
    >
      <Tabs variant="scrollable" value={tab} onChange={handleTabChange}>
        <Tab value={0} label={'Select'} />
        <Tab value={1} label={'Favorites'} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <>
          {view === 'start' ? (
            <SideMenuStart handleViewChange={handleViewChange} />
          ) : view === 'select' ? (
            <CourseSelection
              userCourse={userCourse}
              handleTabChange={handleTabChange}
              handleViewChange={handleViewChange}
            />
          ) : view === 'build' ? (
            <MakeTimetable
              userCourse={userCourse}
              buildTimetable={buildTimetable}
              generatedTimetable={generatedTimetable}
              handleViewChange={handleViewChange}
            />
          ) : (
            <GenerateScreen
              handleViewChange={handleViewChange}
              generatedTimetable={generatedTimetable}
              setTimetableIndex={setTimetableIndex}
            />
          )}
        </>
      </TabPanel>
      <TabPanel value={tab} index={1}></TabPanel>
    </Box>
  );
}
