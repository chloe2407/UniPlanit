import './App.css';
import {Route, Routes, Link} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import SignUp from './pages/SignUp.js';
import Login from './pages/Login.js';
import Landing from './pages/Landing.js';
import Calendar from './pages/Calendar.js';
import ForgotPassword from './pages/ForgotPassword';

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
