import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ErrorFallback({ error }) {
  return (
    <Box>
      <Container>
        <Typography sx={{ textAlign: 'start' }} variant="h6">
          Sorry! Something went wrong!
        </Typography>
        <Typography>Error Message: {error.message}</Typography>
        <Button variant={'contained'} href={'../'}>
          Back to home
        </Button>
      </Container>
    </Box>
  );
}
