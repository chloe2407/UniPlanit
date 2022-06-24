import React, { useEffect, useState } from 'react';
import WeekView from 'calendar/Weekview.js';
import OptionTab from 'calendar/OptionTab';
import Drawer from '@mui/material/Drawer';
import SideMenu from 'calendar/sideMenu/SideMenu';
import useSocket from 'context/socket';
import { getTimetable } from 'calendar/api/calendarApi';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';

const Calendar = () => {
  // save 10 users schedule
  const [timetableIndex, setTimetableIndex] = useState(0);
  const [timetableLength, setTimetableLength] = useState(0);
  const [userTimetable, setUserTimetable] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [timetableMsg, setTimetableMsg] = useState();
  const { socket } = useSocket();
  const openMsg = Boolean(timetableMsg);

  // useEffect(() => {
  //  get timetable if there is saved timetable
  //   getTimetable(socket)
  // },[])

  const drawerWidth = 30;

  useEffect(() => {
    socket.on('get timetable', (timetable) => {
      if (timetable?.length > 0) {
        setUserTimetable(timetable);
        setTimetableIndex(0);
        // console.log(timetable.length)
        setTimetableLength(timetable.length);
      } else {
        setTimetableMsg("Sorry! Couldn't generate a timetable");
        setUserTimetable(null);
      }
    });
    return () => {
      socket.off('get timetable');
    };
  }, []);

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box>
      <Drawer
        variant="persistent"
        open={openDrawer}
        sx={{
          '.MuiDrawer-paperAnchorLeft': {
            position: 'absolute',
            top: '6.4em',
          },
        }}
        // onClose={() => handleCloseDrawer()}
      >
        <SideMenu handleOpenDrawer={handleOpenDrawer} />
      </Drawer>
      <OptionTab
        handleOpenDrawer={handleOpenDrawer}
        timetableIndex={timetableIndex}
        timetableLength={timetableLength}
        setTimetableIndex={setTimetableIndex}
      />
      <WeekView
        sx={{
          marginLeft: openDrawer && `${drawerWidth}vw`,
          width: openDrawer ? `${100 - drawerWidth}vw` : '100vw',
        }}
        userTimetable={userTimetable}
        timetableIndex={timetableIndex}
      />
      <Snackbar
        open={openMsg}
        onClose={() => setTimetableMsg(null)}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setTimetableMsg(null)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        message={timetableMsg}
      />
    </Box>
  );
};

export default Calendar;
