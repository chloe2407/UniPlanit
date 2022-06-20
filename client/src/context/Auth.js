import React, { createContext, useMemo, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axios } from '../lib/axios';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const authenticate = (type, values) => {
    axios
      .post(`/users/${type}`, values)
      .then((data) => {
        setUser(data);
        navigate((location.state && location.state.from.pathname) || '../calendar');
      })
      .catch((err) => {
        setErr(err.message);
      });
  };

  const logout = () => {
    axios.post('/users/logout').then(() => {
      setUser(null);
      navigate('/');
      window.location.reload();
    });
  };

  const checkLoggedIn = () => {
    axios
      .post('users/getLoggedIn')
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  };

  const memo = useMemo(
    () => ({
      user,
      err,
      authenticate,
      logout,
      checkLoggedIn,
      setUser,
      // eslint-disable-next-line
    }),
    [user, err]
  );

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  // allows you to use all the values provided by the provider
  return useContext(AuthContext);
}
