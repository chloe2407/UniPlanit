import { useContext, useEffect, useState } from 'react'
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
import { SocketContext } from '../context/socket'

export default function ChatWidget({ show, friendInfo }) {

    const socket = useContext(SocketContext)

    useEffect(() => {
        socket.emit('USER_ONLINE', 'online')
    })
    return (
        <Draggable style={{ position: 'absolute', left: '90vh', top: '50vh' }}>
            <Box sx={{
                color: 'white',
                backgroundColor: 'black',
                padding: 2,
                borderRadius: 3,
            }}>
                <Stack divider={<Divider flexItem />}>
                    <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                            <Typography>
                                SL
                            </Typography>
                        </Avatar>
                        <Typography>
                            Siqi Liu
                        </Typography>
                        <IconButton sx={{
                            color: 'inherit'
                        }}>
                            <MinimizeIcon style={{ transform: 'rotate(0.5turn)'}}/>
                        </IconButton>
                    </Stack>
                    <Box sx={{ height: '30vh', width: '20vh', p: 1, textAlign:'start' }}>
                        <Typography> Hello </Typography>
                        <Typography> Let's compare our schedules! </Typography>
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
                            variant='outlined' />
                        <Button sx={{ color: 'white' }}>
                            Send
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Draggable>
    )
}