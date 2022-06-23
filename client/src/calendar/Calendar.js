import React, { useEffect, useState } from 'react';
import WeekView from 'calendar/Weekview.js';
import OptionTab from 'calendar/OptionTab';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import SideMenu from 'calendar/sideMenu/SideMenu';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import useSocket from 'context/socket';
import { getTimetable } from 'calendar/api/calendarApi';

const Calendar = () => {
  // save 10 users schedule
  const [timetableIndex, setTimetableIndex] = useState({
    term: 'F',
    index: 0,
  });
  const [userTimetable, setUserTimetable] = useState([
    // demo, waiting for generator to be fixed
    [
      {
        courseCode: 'FIN100H1',
        courseTitle: 'Elementary Finnish I',
        term: 'F',
        isLocked: true,
      },
      {
        courseCode: 'EST100H1',
        courseTitle: 'Elementary Estonian Language and Culture I',
        term: 'F',
        isLocked: false,
        section: {
          isLocked: false,
          sectionCode: 'LEC-5101',
          term: 'F',
          instructors: [],
          meetingTimes: [
            {
              day: 'Monday',
              startTime: '17:00',
              endTime: '19:00',
              assignedRoom1: '',
            },
            {
              day: 'Thursday',
              startTime: '17:00',
              endTime: '19:00',
              assignedRoom1: '',
            },
          ],
        },
      },
    ],
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { socket } = useSocket();

  // useEffect(() => {
  //   getTimetable(socket)
  // },[])

  useEffect(() => {
    socket.on('get timetable', (timetable) => {
      console.log(timetable);
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
                <OptionTab
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
        <OptionTab
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
