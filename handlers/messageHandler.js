const Message = require('../models/message');

module.exports = (io) => {
  const sendPrivateMessage = async function ({ msg, to }) {
    const socket = this;
    try {
      const message = new Message({
        from: socket.userId,
        to: to,
        time: new Date(),
        message: msg,
      });
      await message.save();
      io.to(to).to(socket.userId).emit('private message', message);
    } catch (e) {
      next(new Error(e.message));
    }
  };
  return {
    sendPrivateMessage,
  };
};
