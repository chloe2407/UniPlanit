import { io } from 'socket.io-client';
import { createContext, useContext, useMemo, useEffect } from 'react';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socket = io.connect();

  useEffect(() => {
    socket.on('connection_error', () => {
      // socket.emit('user status', 'offline');
      // socket.connect()
      console.log('disconnecting');
      socket.disconnect();
    });
    return () => socket.off('connection_error');
  }, []);

  useEffect(() => {
    socket.on('disconnect', (reason) => {
      // socket.emit('user status', 'offline');
      console.log(reason);
      console.log('disconnecting');
      socket.disconnect();
      if (reason === 'io server disconnect') {
      }
    });
    return () => socket.off('disconnect');
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memo = useMemo(() => ({ socket }), []);

  return (
    <SocketContext.Provider value={memo}>{children}</SocketContext.Provider>
  );
}

export default function useSocket() {
  return useContext(SocketContext);
}
