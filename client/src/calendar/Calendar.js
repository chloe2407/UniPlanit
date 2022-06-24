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
import useMediaQuery from '@mui/material/useMediaQuery';

const Calendar = () => {
  // save 10 users schedule
  const [timetableIndex, setTimetableIndex] = useState(0);
  const [timetableLength, setTimetableLength] = useState(0);
  const [userTimetable, setUserTimetable] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [timetableMsg, setTimetableMsg] = useState();
  const { socket } = useSocket();
  const matchSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const matchMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const openMsg = Boolean(timetableMsg);
  // useEffect(() => {
  //  get timetable if there is saved timetable
  //   getTimetable(socket)
  // },[])

  const drawerWidth = matchMd ? 100 : 25;

  useEffect(() => {
    socket.on('get timetable', (timetable) => {
      if (timetable?.length > 0) {
        setUserTimetable(timetable);
        setTimetableIndex(0);
        // console.log(timetable.length)
        setTimetableLength(timetable.length);
      } else {
        setTimetableMsg(
          "Sorry! We couldn't generate a timetable with the selected courses"
        );
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
            top: matchSm ? '8.4em' : '6.4em',
          },
        }}
        // onClose={() => handleCloseDrawer()}
      >
        <SideMenu
          handleOpenDrawer={handleOpenDrawer}
          openDrawer={openDrawer}
          drawerWidth={drawerWidth}
        />
      </Drawer>
      <OptionTab
        handleOpenDrawer={handleOpenDrawer}
        timetableIndex={timetableIndex}
        timetableLength={timetableLength}
        setTimetableIndex={setTimetableIndex}
        openDrawer={openDrawer}
      />
      <WeekView
        sx={{
          marginLeft: openDrawer ? `${drawerWidth}vw` : 0,
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeInOut,
              duration: 225,
            }),
        }}
        userTimetable={userTimetable}
        timetableIndex={timetableIndex}
      />
      <Snackbar
        open={openMsg}
        onClose={() => setTimetableMsg(null)}
        autoHideDuration={3000}
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
