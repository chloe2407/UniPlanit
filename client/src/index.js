import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import PageLayout from './globalComponents/PageLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './home/SignUp';
import Login from './home/Login';
import Landing from './landing/Landing';
import Calendar from './calendar/Calendar';
import ForgotPassword from './home/ForgotPassword';


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