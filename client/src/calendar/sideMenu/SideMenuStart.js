import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function SideMenuStart({ handleViewChange }) {
  return (
    <Box sx={{ textAlign: 'start', m: 3 }}>
      <Typography variant={'h5'} sx={{ mb: 1 }}>
        Choose an option to start
      </Typography>
      <Button
        sx={{ textAlign: 'start' }}
        onClick={() => handleViewChange(null, 'select')}
      >
        <Typography>Build a timetable</Typography>
      </Button>
      <Button
        sx={{ textAlign: 'start' }}
        onClick={() => handleViewChange(null, 'generated')}
      >
        <Typography>See last generated timetables</Typography>
      </Button>
    </Box>
  );
}
