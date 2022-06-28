import { io } from 'socket.io-client';
import { createContext, useContext, useMemo, useEffect, useState } from 'react';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socket = io.connect();
  const [socketError, setSocketError] = useState();

  useEffect(() => {
    socket.on('connection_error', (err) => {
      setSocketError(err);
      socket.disconnect();
    });
    return () => socket.off('connection_error');
  }, []);

  useEffect(() => {
    socket.on('disconnect', (reason) => {
      switch (reason) {
        case 'io server disconnect':
          socket.connect();
          break;
        case 'transport error':
          setSocketError('Sorry! Something went wrong with the server');
          socket.connect();
          break;
        case 'transport close':
          setSocketError('Connection closed');
          socket.connect();
          break;
      }
    });
    return () => socket.off('disconnect');
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memo = useMemo(() => ({ socketError, socket }), []);

  return (
    <SocketContext.Provider value={memo}>{children}</SocketContext.Provider>
  );
}

export default function useSocket() {
  return useContext(SocketContext);
}
