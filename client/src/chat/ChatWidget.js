import { useEffect, useState, useRef } from 'react'
import { Draggable } from 'drag-react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import MinimizeIcon from '@mui/icons-material/Minimize';
import IconButton from '@mui/material/IconButton'
import useSocket from '../context/socket'
import useAuth from '../context/Auth'
import initialToColor from '../globalComponents/InitialToColor'

export default function ChatWidget({ friendInfo, handleCloseChat }) {

    const { socket } = useSocket()
    const [conversation, setConversation] = useState()
    const [msg, setMsg] = useState('')
    const { user } = useAuth()
    const endRef = useRef()

    useEffect(() => {
        fetch('../users/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ friendId: friendInfo._id })
        })
            .then(res => res.json())
            .then(data => {
                setConversation(data)
            })
    }, [socket])

    useEffect(() => {
        socket.on('private message', (msg) => {
            if (msg.from === friendInfo._id || msg.from === user._id) {
                setConversation((conversation) => [
                    ...conversation, msg
                ])
            }
        })
        return () => {
            socket.off('privat message')
        }
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [conversation])
    const handleMessage = e => {
        setMsg(e.target.value)
    }

    const handleSendMessage = (socket, to, msg) => {
        if (msg.length > 0) {
            socket.emit('private message', { msg: msg, to: to })
            setMsg('')
        }
    }

    const scrollToBottom = () => {
        endRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <Draggable style={{ position: 'absolute', left: '50vh', top: '50vh' }}>
            <Box sx={{
                color: 'white',
                backgroundColor: 'black',
                padding: 2,
                borderRadius: 3,
            }}>
                <Stack divider={<Divider flexItem />}>
                    <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
                        <Avatar
                            sx={{
                                width: 30,
                                height: 30,
                                backgroundColor: initialToColor(`${friendInfo.first[0]}${friendInfo.last[0]}`)
                            }}
                            src={friendInfo.profileImg}>
                            <Typography>
                                {`${friendInfo.first[0]}${friendInfo.last[0]}`}
                            </Typography>
                        </Avatar>
                        <Typography>
                            {`${friendInfo.first} ${friendInfo.last}`}
                        </Typography>
                        <IconButton
                            sx={{ color: 'inherit' }}
                            onClick={() => handleCloseChat(friendInfo)}
                        >
                            <MinimizeIcon style={{ transform: 'rotate(0.5turn)' }} />
                        </IconButton>
                    </Stack>

                    <Box style={{ maxHeight: 400, overflow: 'auto' }} sx={{ height: '30vh', width: '20vh', p: 1, textAlign: 'start' }}>
                        {
                            conversation && conversation.map(m => (
                                <Box key={m._id}>
                                    <Typography>
                                        {m.from === friendInfo._id ?
                                            `${friendInfo.first} ${friendInfo.last}`
                                            :
                                            `${user.first} ${user.last}`
                                        }:
                                    </Typography>
                                    <Typography>
                                        {m.message}
                                    </Typography>
                                </Box>
                            ))
                        }
                        <div ref={endRef} />
                    </Box>

                    <Stack direction='row'>
                        <TextField
                            sx={{
                                border: '1px solid white',
                                '& .MuiInputBase-input': {
                                    color: 'white',
                                    p: 1,
                                }
                            }}
                            label={null}
                            variant='outlined'
                            value={msg}
                            onChange={handleMessage} />
                        <Button
                            sx={{ color: 'white' }}
                            onClick={() => handleSendMessage(socket, friendInfo._id, msg)}>
                            Send
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Draggable>
    )
}