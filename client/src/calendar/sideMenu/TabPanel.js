import Box from '@mui/material/Box';

export default function TabPanel({ children, value, index }) {
  return (
    <Box mt={2} sx={{ m: 3, textAlign: 'start' }} hidden={value !== index}>
      {value === index && children}
    </Box>
  );
}
