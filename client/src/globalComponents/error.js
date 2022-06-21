import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function ErrorFallback() {
  const navigate = useNavigate();
  return (
    <Box>
      <Container>
        <Typography variant="h1">Sorry! Something went wrong!</Typography>
        <Button onClick={() => navigate('../')}>Back to home</Button>
      </Container>
    </Box>
  );
}
