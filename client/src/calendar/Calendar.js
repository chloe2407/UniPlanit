import React from 'react';
import { useState } from 'react';

import WeekView from './weekview.js';
import OptionsTab from './optionstab.js';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import SideMenu from './sideMenu/SideMenu';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const Calendar = () => {
  const [currentSession, setCurrentSession] = useState(0);
  const [currentSchedule, setCurrentSchedule] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const [anchor, setAnchor] = useState();

  return (
    // <Grid container sx={{ height: '100vh'}}>
    //     <Grid item xs={3} sm={3} sx={{ p: 2 }}>
    <>
      <Drawer
        open={openDrawer}
        anchor="left"
        variant="temporary"
        onClose={() => setOpenDrawer(false)}
      >
        {/* <SideMenu /> */}
        {openEdit ? (
          <Grid container sx={{ height: '100vh', width: '100vw' }} columns={10}>
            <Grid item xs={4} sm={3} sx={{ p: 2, borderRight: 1 }}>
              <SideMenu
                handleCloseDrawer={handleCloseDrawer}
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
              />
            </Grid>
            {/* <Divider sx={{ mt: 1, mb: 1, mx: 2 }} orientation='vertical'/> */}
            <Grid item xs={6} sm={9}>
              <Collapse in={openEdit} unmountOnExit>
                <OptionsTab setCurrentSession={setCurrentSession} />
                <WeekView currentSession={currentSession} />
              </Collapse>
            </Grid>
          </Grid>
        ) : (
          <Grid container sx={{ height: '100vh', width: '40vw' }} columns={10}>
            <Grid item xs={10} sm={10} sx={{ p: 2, borderRight: 1 }}>
              <SideMenu
                handleCloseDrawer={handleCloseDrawer}
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
              />
            </Grid>
          </Grid>
        )}
      </Drawer>
      <div sx={{ zIndex: 1 }} style={{ height: '100vh', overflow: 'scroll' }}>
        <OptionsTab
          openDrawer={openDrawer}
          setCurrentSession={setCurrentSession}
          setCurrentSchedule={setCurrentSchedule}
        />
        <WeekView
          currentSession={currentSession}
          currentSchedule={currentSchedule}
        />
      </div>
    </>
  );
};

export default Calendar;
