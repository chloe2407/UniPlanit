import './App.css';
import { Outlet } from "react-router-dom";

// we will only have the layout here
// everything else will be rendered through outlet

// import SignUp from './chloe/pages/SignUp.js';
// import Login from './chloe/pages/Login.js';
// import Landing from './chloe/pages/Landing.js';
// import Calendar from './chloe/pages/Calendar.js';
// import ForgotPassword from './chloe/pages/ForgotPassword';

function App() {
  return (
    <div className='App'>
      <Outlet />
    </div>
  );
}

export default App;
