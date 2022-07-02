import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import theme from 'theme/theme';

export default function Footer() {
  // show disclaimer
  // This website is not asscoiated with the University of Toronto
  // The times may not be accurate, visit https://timetable.iit.artsci.utoronto.ca/ for accurate times
  return (
    <Box
      textAlign={'start'}
      sx={{
        p: 2,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
      }}
    >
      <Container>
        <Typography>Disclaimer</Typography>
        <Typography>
          This website is not affiliated with the University of Toronto
        </Typography>
        <Typography>
          Data from https://timetable.iit.artsci.utoronto.ca/ has precedence
          over information presented here.
        </Typography>
      </Container>
    </Box>
  );
}
