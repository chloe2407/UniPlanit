import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  backgroundColor: theme.palette.primary.main,
  textTransform: 'capitalize',
  transition: 'all 0.2s',
  ':hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'rgba(255, 255, 255, 1)',
    boxShadow: '0 0 25% rgba(255, 255, 255, 1)',
  },
}));

export default function NavbarButton({ children, sx, href, onClick }) {
  return (
    <StyledButton
      style={{ boxShadow: 'none' }}
      size="small"
      variant="contained"
      sx={{ ...sx, mt: 0.5 }}
      href={href}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}
