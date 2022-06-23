import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid black',
  borderTop: '0',
  borderBottom: '0',
  width: '100px',
}));

// export const TableCell = ({children, rowSpan, colSpan}) => {
//   return (
//     <StyledTableCell rowSpan={rowSpan} colSpan={colSpan}>
//         {children}
//     </StyledTableCell>
//   )
// }
