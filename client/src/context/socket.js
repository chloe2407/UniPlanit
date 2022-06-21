import { io } from 'socket.io-client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socket = io.connect();
  console.log('One connected');

  socket.emit('user status', 'online');

  socket.on('connection_error', () => {
    socket.emit('user status', 'offline');
    // socket.connect()
  });

  socket.on('disconnect', (reason) => {
    socket.emit('user status', 'offline');
    console.log(reason);
    if (reason === 'io server disconnect') {
      // socket.connect()
    }
  });

  const memo = useMemo(() => ({ socket }), []);

  return <SocketContext.Provider value={memo}>{children}</SocketContext.Provider>;
}

export default function useSocket() {
  return useContext(SocketContext);
}
