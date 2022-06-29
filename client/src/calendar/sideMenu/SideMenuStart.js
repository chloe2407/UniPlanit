import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Stack from '@mui/material/Stack';
import { FadeIn } from 'react-slide-fade-in';
import FadeContent from 'react-fade-in';
import useCalendar from 'context/calendar';

export default function SideMenuStart() {
  const { setView } = useCalendar();
  const NextButton = ({ onClick, text }) => {
    return (
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
          onClick={onClick}
        >
          <Typography sx={{ mr: 1 }}>{text}</Typography>{' '}
          <ArrowForwardIosIcon id="arrow" fontSize="xs" />
        </Button>
      </Stack>
    );
  };

  return (
    <FadeIn from="left" positionOffset={200} durationInMilliseconds={500}>
      <Typography variant={'h5'} sx={{ mb: 1 }}>
        Choose an option to start
      </Typography>
      <FadeContent delay={300}>
        <NextButton
          onClick={() => setView('select')}
          text={'Build a timetable'}
        />
        <NextButton
          onClick={() => setView('generate')}
          text={'See last generated timetables'}
        />
      </FadeContent>
    </FadeIn>
  );
}
