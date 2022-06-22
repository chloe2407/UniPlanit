const Message = require('../models/message');
const User = require('../models/user');

module.exports = (io) => {
  const sendPrivateMessage = async function ({ msg, to }) {
    const socket = this;
    const message = new Message({
      from: socket.userId,
      to: to,
      time: new Date(),
      message: msg,
    });
    await message.save();
    io.to(to).to(socket.userId).emit('private message', message);
  };
  return {
    sendPrivateMessage,
  };
};
