import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Stack from '@mui/material/Stack';
import { FadeIn } from 'react-slide-fade-in';
import FadeContent from 'react-fade-in';

export default function SideMenuStart({ handleViewChange }) {
  return (
    <FadeIn from="left" positionOffset={200} durationInMilliseconds={500}>
      <Box sx={{ textAlign: 'start', m: 3 }}>
        <Typography variant={'h5'} sx={{ mb: 1 }}>
          Choose an option to start
        </Typography>
        <FadeContent delay={300}>
          <Stack direction={'row'}>
            <Button
              sx={{
                textAlign: 'start',
                alignContent: 'center',
                ':hover': {
                  '#arrow': {
                    ml: 2,
                    transition: (theme) =>
                      theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeIn,
                        duration: 225,
                      }),
                  },
                },
              }}
              onClick={() => handleViewChange(null, 'select')}
            >
              <Typography sx={{ mr: 1 }}>Build a timetable</Typography>{' '}
              <ArrowForwardIosIcon id="arrow" fontSize="xs" />
            </Button>
          </Stack>
          <Stack direction={'row'}>
            <Button
              sx={{
                textAlign: 'start',
                alignContent: 'center',
                ':hover': {
                  '#arrow': {
                    ml: 2,
                    transition: (theme) =>
                      theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeIn,
                        duration: 225,
                      }),
                  },
                },
              }}
              onClick={() => handleViewChange(null, 'generated')}
            >
              <Typography sx={{ mr: 1 }}>
                See last generated timetables
              </Typography>{' '}
              <ArrowForwardIosIcon id={'arrow'} fontSize="xs" />
            </Button>
          </Stack>
        </FadeContent>
      </Box>
    </FadeIn>
  );
}
