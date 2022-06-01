import './App.css';
import {Route, Routes, Link} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import SignUp from './chloe/pages/SignUp.js';
import Login from './chloe/pages/Login.js';
import Landing from './chloe/pages/Landing.js';
import Calendar from './chloe/pages/Calendar.js';
import ForgotPassword from './chloe/pages/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/calendar" element={<Calendar/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
