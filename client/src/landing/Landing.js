import { Link } from 'react-router-dom';
import { Box, Grid, CssBaseline } from '@material-ui/core';
import Mainframe from './components/Mainframe';
import Features from './components/Features';

function Landing() {
  return (
    <Box overflow="auto" flex={1} flexDirection="column" display="flex">
      <Mainframe />
      <Features />
    </Box>
  );
}

export default Landing;
