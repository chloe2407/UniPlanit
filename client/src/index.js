import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'

import PageLayout from './globalComponents/PageLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './home/SignUp';
import Login from './home/Login';
import Landing from './landing/Landing';
import Calendar from './calendar/Calendar';
import ForgotPassword from './home/ForgotPassword';
import About from './about/About';
import { AuthProvider } from './context/Auth'
import RequireAuth from './globalComponents/RequireAuth'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<App />}>
            <Route element={<PageLayout />}>
              <Route index element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/calendar" element={
                <RequireAuth>
                  <Calendar />
                </RequireAuth>} />
              <Route path="/about" element={<About />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter >
  </ThemeProvider>
);