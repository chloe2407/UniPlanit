const User = require('../models/user');
module.exports = (io) => {
  const addFriend = async function ({ to }) {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      if (to === user.email) {
        io.to(socket.userId).emit(
          'add friend',
          'Error',
          'You cannot add yourself'
        );
      } else {
        User.findOne({ email: to }, async (err, friend) => {
          if (!friend) {
            io.to(socket.userId).emit(
              'add friend',
              'Error',
              'Cannot find user!'
            );
          } else if (user.friendRequests.includes(friend.id)) {
            io.to(socket.userId).emit(
              'add friend',
              'Error',
              'You have a friend request from this user!'
            );
          } else if (user.friends.includes(friend.id)) {
            io.to(socket.userId).emit(
              'add friend',
              'Error',
              'Already Friends!'
            );
          } else if (friend.friendRequests.includes(socket.userId)) {
            io.to(socket.userId).emit(
              'add friend',
              'Error',
              'Pending Request!'
            );
          } else {
            friend.friendRequests.push(socket.userId);
            await friend.save();
            io.to(socket.userId).emit('add friend', 'Success', 'Sent Request!');
            io.to(friend.id).emit('received friend request');
          }
        });
      }
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const removeFriend = async function ({ to }) {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      const friend = await User.findById(to);
      user.friends = user.friends.filter((f) => f._id != to);
      friend.friends = friend.friends.filter((f) => f._id != user.id);
      await friend.save();
      await user.save();
      io.to(socket.userId).emit(
        'remove friend',
        `Successfully removed ${friend.first} ${friend.last}`
      );
      io.to(friend.id).emit('remove friend');
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const getFriend = async function () {
    const socket = this;
    try {
      const user = await User.findById(socket.userId).populate('friends');
      io.to(socket.userId).emit('get user friend', user.friends);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const getFriendRequest = async function () {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      await user.populate('friendRequests', ['first', 'last']);
      io.to(socket.userId).emit('get friend request', user.friendRequests);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const acceptFriendRequest = async function ({ to }) {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      const friend = await User.findById(to);
      user.friends.push(to);
      friend.friends.push(socket.userId);
      user.friendRequests = user.friendRequests.filter((r) => r != to);
      await user.save();
      await friend.save();
      io.to(socket.userId).emit(
        'accepted friend',
        `Successfully added ${friend.first} ${friend.last}`
      );
      io.to(to).emit(
        'accepted friend',
        `${friend.first} ${friend.last} has accepted your friend request`
      );
      io.to(socket.userId).emit('get friend request', user.friendRequests);
    } catch (e) {
      next(new Error(e.message));
    }
  };

  const rejectFriendRequest = async function ({ to }) {
    const socket = this;
    try {
      const user = await User.findById(socket.userId);
      user.friendRequests = user.friendRequests.filter((r) => r != to);
      await user.save();
      io.to(socket.userId).emit('reject friend', `Rejected friend request`);
      io.to(socket.userId).emit('get friend request', user.friendRequests);
    } catch (e) {
      next(new Error(e.message));
    }
  };
  return {
    getFriend,
    addFriend,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    getFriendRequest,
  };
};
