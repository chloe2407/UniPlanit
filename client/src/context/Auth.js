import React, { createContext, useMemo, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axios } from 'lib/axios';
import useSocket from 'context/socket';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { socket } = useSocket();

  const authenticate = (type, values) => {
    axios
      .post(`users/${type}`, values)
      .then((data) => {
        console.log('authenticating');
        if (socket) {
          socket.disconnect();
          socket.connect();
          if (!data.err) {
            setUser(data);
            navigate(
              (location.state && location.state.from.pathname) || '../calendar'
            );
          } else {
            setErr(data.err);
          }
        }
      })
      .catch((err) => {
        setErr(err.message);
      });
  };

  const logout = () => {
    axios.post('users/logout').then(() => {
      setUser(null);
      navigate('/');
      window.location.reload();
    });
  };

  const checkLoggedIn = () => {
    console.log('Checking logged in');
    axios
      .post('users/getLoggedIn')
      .then((data) => {
        if (!data.err) {
          setUser(data);
        }
      })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, err]
  );

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  // allows you to use all the values provided by the provider
  return useContext(AuthContext);
}
