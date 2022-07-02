import React, { useEffect } from 'react';
import useAuth from 'context/auth';
import { Outlet } from 'react-router-dom';
import ErrorFallback from 'components/error';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';

function App() {
  const { checkLoggedIn } = useAuth();
  useEffect(() => {
    checkLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="App">
        <Outlet />
      </div>
    </ErrorBoundary>
  );
}

export default App;
