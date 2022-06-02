import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import PageLayout from './GlobalComponents/PageLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Home/SignUp';
import Login from './Home/Login';
import Landing from './Landing/Landing';
import Calendar from './Calendar/Calendar';
import ForgotPassword from './Home/ForgotPassword';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route element={<PageLayout />}>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter >
);