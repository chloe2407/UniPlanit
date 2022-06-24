import React, { useEffect, useState } from 'react';
import WeekView from 'calendar/Weekview.js';
import OptionTab from 'calendar/OptionTab';
import GenerateScreen from 'calendar/GenerateScreen';
import Drawer from '@mui/material/Drawer';
import SideMenu from 'calendar/sideMenu/SideMenu';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
  const [generatedTImeTables, setGeneratedTimeTables] = useState([]);
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

  const drawerWidth = 25;

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
    // <Box>
    //   <Drawer
    //     variant="persistent"
    //     open={openDrawer}
    //     sx={{
    //       '.MuiDrawer-paperAnchorLeft': {
    //         position: 'absolute',
    //         top: '6.4em',
    //         height: 'max-content',
    //       },
    //     }}
    //     // onClose={() => handleCloseDrawer()}
    //   >
    //     {openEdit ? (
    //       <Grid container sx={{ height: '100vh', width: '100vw' }} columns={10}>
    //         <Grid item xs={12} sm={4} sx={{ p: 2, borderRight: 1 }}>
    //           <EditScreen
    //             generatedTImeTables={generatedTImeTables}
    //             timetableIndex={timetableIndex}
    //             setOpenEdit={setOpenEdit}
    //           />
    //           <Button
    //             onClick={() => setOpenEdit(!openEdit)}
    //             variant={'contained'}
    //           >
    //             <Typography>Discard changes</Typography>
    //           </Button>
    //         </Grid>
    //         <Grid item xs={12} sm={6}>
    //           <OptionTab
    //             handleOpenDrawer={handleOpenDrawer}
    //             timetableIndex={timetableIndex}
    //             timetableLength={timetableLength}
    //             setTimetableIndex={setTimetableIndex}
    //             sidebar={false}
    //           />
    //           {/* userTimetable={generatedTImeTables[timetaableIndex]} */}
    //           <WeekView
    //             userTimetable={userTimetable}
    //             timetableIndex={timetableIndex}
    //           />
    //         </Grid>
    //       </Grid>
    //     ) : (
    //       <Grid container sx={{ height: '100vh', width: '40vw' }}>
    //         <Grid item xs={12} sm={12} sx={{ p: 2, borderRight: 1 }}>
    //         <SideMenu handleOpenDrawer={handleOpenDrawer} openDrawer={openDrawer} />
    //           <Button
    //             onClick={() => setOpenEdit(!openEdit)}
    //             variant={'contained'}
    //           >
    //             <Typography>Generate timetables</Typography>
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     )}
    //   </Drawer>
    //   <div sx={{ zIndex: 1 }}>
    //     <OptionTab
    //       handleOpenDrawer={handleOpenDrawer}
    //       timetableIndex={timetableIndex}
    //       timetableLength={timetableLength}
    //       setTimetableIndex={setTimetableIndex}
    //       sidebar={true}
    //     />
    //     <WeekView
    //       userTimetable={userTimetable}
    //       timetableIndex={timetableIndex}
    //     />
    //   </div>
    // </Box>

    <Box>
      <Drawer
        variant="persistent"
        open={openDrawer}
        sx={{
          '.MuiDrawer-paperAnchorLeft': {
            position: 'absolute',
            top: '6.4em',
            height: 'max-content',
          },
        }}
        // onClose={() => handleCloseDrawer()}
      >
        <GenerateScreen />
        {/* {openEdit ? 
      <>
        <SideMenu handleOpenDrawer={handleOpenDrawer} openDrawer={openDrawer} />
        <Button
          onClick={() => setOpenEdit(!openEdit)}
          variant={'contained'}
        >
          <Typography>Generate timetables</Typography>
        </Button>
      </>: 
      <>
        <EditScreen
          generatedTImeTables={generatedTImeTables}
          timetableIndex={timetableIndex}
          setOpenEdit={setOpenEdit}
        />
        <Button
          onClick={() => setOpenEdit(!openEdit)}
          variant={'contained'}
        >
          <Typography>Discard changes</Typography>
        </Button>
      </>
      } */}
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
