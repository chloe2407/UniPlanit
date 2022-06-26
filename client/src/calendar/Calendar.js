import React, { useEffect, useState } from 'react';
import WeekView from 'calendar/Weekview.js';
import OptionTab from 'calendar/OptionTab';
import Drawer from '@mui/material/Drawer';
import SideMenu from 'calendar/sideMenu/SideMenu';
import useSocket from 'context/socket';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import useFeedback from 'context/feedback';

const Calendar = () => {
  // used for getting current operation: build/generate
  // save 10 users schedule
  const [timetableIndex, setTimetableIndex] = useState(0);
  // used for seeing generated timetable
  const [generatedTimetable, setGenerateTimetable] = useState();
  // used for seeing the timetable being built
  const [buildTimetable, setBuildTimetable] = useState();
  const [openDrawer, setOpenDrawer] = useState(true);
  const [view, setView] = useState('start');
  const { setMsg } = useFeedback();
  const { socket } = useSocket();

  // const matchSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const matchMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const drawerWidth = matchMd ? 95 : 25;

  useEffect(() => {
    socket.on('get generated timetable', (timetable) => {
      console.log(timetable);
      if (timetable?.length > 0) {
        setGenerateTimetable(timetable);
        setTimetableIndex(0);
        handleViewChange(null, 'generated');
      } else {
        setMsg({
          snackVariant: 'error',
          msg: "Sorry! We couldn't generate a timetable with the selected courses",
        });
        setGenerateTimetable(null);
      }
    });
    return () => {
      socket.off('get generated timetable');
    };
  }, []);

  useEffect(() => {
    socket.on('get build timetable', (timetable) => {
      setGenerateTimetable(null);
      setBuildTimetable(timetable);
      handleViewChange(null, 'build');
    });
    return () => {
      socket.off('get build timetable');
    };
  }, []);

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleViewChange = (e, view) => {
    setView(view);
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
      >
        <SideMenu
          handleOpenDrawer={handleOpenDrawer}
          openDrawer={openDrawer}
          buildTimetable={buildTimetable}
          generatedTimetable={generatedTimetable}
          drawerWidth={drawerWidth}
          view={view}
          handleViewChange={handleViewChange}
          timetableIndex={timetableIndex}
          setTimetableIndex={setTimetableIndex}
        />
      </Drawer>
      <OptionTab handleOpenDrawer={handleOpenDrawer} openDrawer={openDrawer} />
      <WeekView
        sx={{
          marginLeft: openDrawer ? `${drawerWidth}vw` : 0,
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeInOut,
              duration: 225,
            }),
        }}
        buildTimetable={buildTimetable}
        generatedTimetable={generatedTimetable}
        timetableIndex={timetableIndex}
      />
    </Box>
  );
};

export default Calendar;
