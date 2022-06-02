import './App.css';
import { Outlet } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'

// global theme provider here

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
