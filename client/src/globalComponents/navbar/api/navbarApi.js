export const addFriend = (socket, to) => {
  socket.emit('add friend', { to: to });
};

export const removeFriend = (socket, to) => {
  socket.emit('remove friend', { to: to });
};

export const getFriendRequest = (socket) => {
  socket.emit('get friend request');
};

export const getFriend = (socket) => {
  socket.emit('get friend');
};

export const acceptFriendRequest = (socket, to) => {
  socket.emit('accept friend request', { to: to });
};

export const rejectFriendRequest = (socket, to) => {
  socket.emit('reject friend request', { to: to });
};
