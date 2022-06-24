import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import useSocket from 'context/socket';
import { getUserCourse } from 'calendar/api/sideMenuApi';
import CourseSelection from 'calendar/sideMenu/CourseSelection';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from 'calendar/sideMenu/TabPanel';
import MakeTimetable from 'calendar/sideMenu/MakeTimetable';

export default function SideMenu({
  drawerWidth,
  handleOpenDrawer,
  openDrawer,
}) {
  const [userCourse, setUserCourse] = useState();
  const { socket } = useSocket();
  const [tab, setTab] = useState(0);

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
  const handleTabChange = (e, newTab) => {
    setTab(newTab);
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
        <Tab value={1} label={'Build'} />
        <Tab value={2} label={'Generate'} />
        <Tab value={3} label={'Favorites'} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <CourseSelection
          userCourse={userCourse}
          openDrawer={openDrawer}
          handleOpenDrawer={handleOpenDrawer}
          handleTabChange={handleTabChange}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <MakeTimetable
          userCourse={userCourse}
          openDrawer={openDrawer}
          handleOpenDrawer={handleOpenDrawer}
        />
        {/* <Typography>This is a test</Typography> */}
      </TabPanel>
      <TabPanel value={tab} index={2}></TabPanel>
      <TabPanel value={tab} index={3}></TabPanel>
    </Box>
  );
}
