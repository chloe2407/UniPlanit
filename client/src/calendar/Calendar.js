import React, { useEffect, useState } from 'react';
import WeekView from 'calendar/Weekview.js';
import OptionsTab from 'calendar/Optionstab.js';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import SideMenu from 'calendar/sideMenu/SideMenu';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import useSocket from 'context/socket';

const Calendar = () => {
  // save 10 users schedule
  const [timetableIndex, setTimetableIndex] = useState({
    term: 'F',
    index: 0,
  });
  const [userTimetable, setUserTimetable] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { socket } = useSocket();

  useEffect(() => {
    socket.on('get timetable', (timetable) => {
      setUserTimetable(timetable);
    });
    return () => {
      socket.off('get timetable');
    };
  }, []);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

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
          <Grid container sx={{ height: '100vh', width: '100vw' }}>
            <Grid item xs={3} sm={3} sx={{ p: 2, borderRight: 1 }}>
              <SideMenu
                handleCloseDrawer={handleCloseDrawer}
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
              />
            </Grid>
            {/* <Divider sx={{ mt: 1, mb: 1, mx: 2 }} orientation='vertical'/> */}
            <Grid item xs={9} sm={9}>
              <Collapse in={openEdit} unmountOnExit>
                <OptionsTab
                  handleOpenDrawer={handleOpenDrawer}
                  timetableIndex={timetableIndex}
                  setTimetableIndex={setTimetableIndex}
                />
                <WeekView
                  userTimetable={userTimetable}
                  timetableIndex={timetableIndex}
                />
              </Collapse>
            </Grid>
          </Grid>
        ) : (
          <Grid container sx={{ height: '100vh', width: '25vw' }}>
            <Grid item xs={12} sm={12} sx={{ p: 2, borderRight: 1 }}>
              <SideMenu
                handleCloseDrawer={handleCloseDrawer}
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
              />
            </Grid>
          </Grid>
        )}
      </Drawer>
      <div sx={{ zIndex: 1 }}>
        <OptionsTab
          handleOpenDrawer={handleOpenDrawer}
          timetableIndex={timetableIndex}
          setTimetableIndex={setTimetableIndex}
        />
        <WeekView
          userTimetable={userTimetable}
          timetableIndex={timetableIndex}
        />
      </div>
    </>
  );
};

export default Calendar;
