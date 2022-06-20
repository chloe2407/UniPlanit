import React from 'react';
import { useState } from 'react';

import WeekView from './weekview.js';
import OptionsTab from './optionstab.js';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import SideMenu from 'calendar/sideMenu/SideMenu';

const Calendar = () => {
  const [currentSession, setCurrentSession] = useState(0);
  const [anchor, setAnchor] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const open = Boolean(anchor);
  const openDrawer = () => {
    setAnchor('left');
  };
  const closeDrawer = () => {
    setAnchor(undefined);
  };

  const handleOpenEdit = () => {};
  return (
    // <Grid container sx={{ height: '100vh'}}>
    //     <Grid item xs={3} sm={3} sx={{ p: 2 }}>
    <>
      <Drawer open={open} onClose={closeDrawer}>
        <SideMenu />
      </Drawer>
      <OptionsTab openDrawer={openDrawer} setCurrentSession={setCurrentSession} />
      <WeekView currentSession={currentSession} />
    </>
    //     </Grid>
    // </Grid>
    //     <Collapse in={open} timeout="auto">
    //             <SideMenu false={openEdit} setOpenEdit={() => setOpenEdit()}/>
    //     </Collapse>E
    // </Box>
    //     <Grid container sx={{ height: '100vh'}}>
    //     <Grid item xs={3} sm={3} sx={{ p: 2 }}>
    //         <SideMenu />
    //     </Grid>
    //     <Grid item xs={9} sm={9}>
    //         <OptionsTab setCurrentSession={setCurrentSession} />
    //         <WeekView currentSession={currentSession} />
    //     </Grid>
    // </Grid>
  );
};

export default Calendar;
