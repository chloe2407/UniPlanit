import { io } from 'socket.io-client';
import { createContext, useContext, useMemo } from 'react';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socket = io.connect();
  console.log('One connected');

  socket.emit('user status', 'online');

  socket.on('connection_error', () => {
    // socket.emit('user status', 'offline');
    // socket.connect()
    console.log('disconnecting');
    socket.disconnect();
  });

  socket.on('disconnect', (reason) => {
    // socket.emit('user status', 'offline');
    console.log(reason);
    console.log('disconnecting');
    socket.disconnect();
    if (reason === 'io server disconnect') {
    }
  });

  const memo = useMemo(() => ({ socket }), []);

  return (
    <SocketContext.Provider value={memo}>{children}</SocketContext.Provider>
  );
}

export default function useSocket() {
  return useContext(SocketContext);
}
