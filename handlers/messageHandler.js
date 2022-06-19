const Message = require('../models/message')

module.exports = (io) => {

    const updateFriend = function( arg1, arg2, callback ) {
        const socket = this
        callback({
            status: 'ok'
        })
    }

    const sendPrivateMessage = function ({ msg, to }) {
        const socket = this
        const message = new Message({
            from: socket.userId,
            to: to,
            time: new Date(),
            message: msg
        })
        message.save()
        io.to(to).to(socket.userId).emit('private message', message)
    }

    return {
        updateFriend,
        sendPrivateMessage,
    }
}