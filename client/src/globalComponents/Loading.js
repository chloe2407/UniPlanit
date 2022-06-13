import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

const Loading = () => {
    return (
        <>
            <Box sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
            }}>
                <Container sx={{ transform: 'scale(0.6)' }}>
                    <img className='ld ld-bounce'
                        style={{ animationDuration: '1s' }}
                        src='./calendar-loader.png' />
                </Container>
            </Box>
        </>
    )
}

export default Loading