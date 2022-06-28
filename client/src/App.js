import React, { useEffect } from 'react';
import useAuth from 'context/auth';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const { checkLoggedIn } = useAuth();
  useEffect(() => {
    checkLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
