import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // border: '1px solid black',

  border: '1px solid rgba(224, 224, 224, 1)',
  borderLeft: '0',
  borderRight: '0',
  width: '20em',
}));
