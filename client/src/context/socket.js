import { io } from 'socket.io-client'
import { createContext } from 'react'

export const socket = io()
export const SocketContext = createContext()

// Lifecycle
// connect to server
// send handshake packet
// establish connection ? no/yes 
// disconnect/connected

socket.on('connect', () => {
    console.log(socket.id)
})

socket.on('connection_error', () => {
    // ... something (send token)
    socket.connect()
})

socket.on('disconnect', (reason) => {
    console.log(reason)
    if (reason === 'io server disconnect') {
        // try reconnect
        socket.connect()
    }
})

// emit - sends something to server
// on - receive something from server

socket.on('hello', arg => {
    console.log(arg)
})

socket.emit('hello', 'world', 'world2')

// use req-res api for live updating friends
// also set time out to an emit
socket.timeout(5000).emit('UPDATE_FRIEND', 'userId', 'action', (err, response) => {
    if (err) {
        console.log(err)
    } else {
        console.log(response.status)
    }
})

const sendMessage = () => {
    socket.emit('message')
}