import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import FeedbackForm from './FeedbackForm';
import theme from 'theme/theme';

const Contact = () => (
  <div>
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{
        backgroundColor: theme.palette.primary.main,
        // backgroundColor: 'white'
      }}
    >
      <Grid item sx={{ MaxWidth: '40vw', color: 'white' }}>
        <ForumIcon sx={{ paddingTop: '50px' }} />
        <Box sx={{ paddingTop: '30px' }}>
          <Typography variant="h4">
            Questions? Feedback? Collaboration?
          </Typography>
          <Typography variant="h4">Reach Us Here!</Typography>
        </Box>
        <Box sx={{ paddingY: '30px' }}>
          <FeedbackForm />
        </Box>
      </Grid>
    </Grid>
  </div>
);

export default Contact;
