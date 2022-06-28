import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ErrorFallback() {
  return (
    <Box>
      <Container>
        <Typography sx={{ textAlign: 'start' }} variant="h6">
          Sorry! Something went wrong!
        </Typography>
        <Button href={'../'}>Back to home</Button>
      </Container>
    </Box>
  );
}
