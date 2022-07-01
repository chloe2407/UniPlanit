import React, { useEffect, useState } from 'react';
import useAuth from 'context/auth';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const [checked, setChecked] = useState('loading');

  useEffect(() => {
    setChecked('checked');
  }, []);
  return (
    <>
      {checked && user ? (
        children
      ) : (
        <Navigate to="/login" replace state={{ from: location }} />
      )}
    </>
  );
}
