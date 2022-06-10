import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import FeedbackForm from './FeedbackForm';

const Contact = () => (
    <div>
        <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2} >
            <ForumIcon sx={{ paddingTop: '50px' }} />
            <Box sx={{ paddingTop: '30px' }}>
                <Typography variant='h4'>Questions? Feedback? Collaboration?</Typography>
                <Typography variant='h4'>Reach Us Here!</Typography>
            </Box>
            <Box sx={{ paddingY: '30px' }}>
                <FeedbackForm />
            </Box>
        </Grid>
    </div >
);

export default Contact;
