import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Stack from '@mui/material/Stack';
import { FadeIn } from 'react-slide-fade-in';
import FadeContent from 'react-fade-in';
import useCalendar from 'context/calendar';
import SideMenuTitle from 'calendar/sideMenu/components/SideMenuTitle';

export default function TermSelection({ setTerm }) {
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
    <FadeIn from="right" positionOffset={200} durationInMilliseconds={500}>
      <SideMenuTitle title={'Choose a term'} backTo={'start'} />
      <Typography>
        You will be able to choose Y courses in both terms
      </Typography>
      <FadeContent delay={300}>
        <NextButton
          onClick={() => {
            setTerm('F');
            setView('select');
          }}
          text={'Fall'}
        />
        <NextButton
          onClick={() => {
            setTerm('S');
            setView('select');
          }}
          text={'Winter'}
        />
      </FadeContent>
    </FadeIn>
  );
}
