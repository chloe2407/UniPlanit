import React, { useEffect } from 'react';
import useAuth from './context/Auth';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const { checkLoggedIn } = useAuth();
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
