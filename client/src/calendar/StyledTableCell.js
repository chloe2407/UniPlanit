import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // [`&.${tableCellClasses.head}`]: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  // },
  // [`&.${tableCellClasses.body}`]: {
  //   fontSize: 14,
  // },
  border: '1px solid black',
  borderTop: '0',
  borderBottom: '0',
  width: '100px',
}));
