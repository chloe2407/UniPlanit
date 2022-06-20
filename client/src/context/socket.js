import { io } from 'socket.io-client';
import { createContext, useContext } from 'react';
import useAuth from './Auth';
import { useMemo, useState } from 'react';

// Lifecycle
// connect to server
// send handshake packet
// establish connection ? no/yes
// disconnect/connected
const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socket = io();
  const { user } = useAuth();

  if (user) {
    const userId = user._id;
    socket.auth = {
      username: user.email,
      userId: userId,
    };
    socket.userId = userId;
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
  }

  const memo = useMemo(() => ({ socket }), [socket]);

  return <SocketContext.Provider value={memo}>{children}</SocketContext.Provider>;
}

export default function useSocket() {
  return useContext(SocketContext);
}
