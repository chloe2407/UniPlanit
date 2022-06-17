import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { StyledPopover } from './NavbarMenu'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import { Formik } from 'formik'
import * as yup from 'yup'
import Typography from '@mui/material/Typography';
import NavbarTooltip from './NavbarTooltip';

export default function AddFriend({ sx, handleFriendChange, handleSuccessMsg, handleErrorMsg }) {
    const [anchorEl, setAnchorEl] = useState(null)
    // using md as breakpoints for mobile version
    const open = Boolean(anchorEl)
    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    const emailSchema = yup.object().shape({
        email: yup.string().email().required()
    })

    const handleAddFriend = (email) => {
        fetch('users/friends/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                friendEmail: email
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    handleErrorMsg(data.err)
                } else {
                    handleSuccessMsg(data.success)
                    handleFriendChange()
                }
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <>
            <NavbarTooltip title={
                <Typography> Add Friend </Typography>
            }>
                <IconButton size='large'
                    aria-controls='friend-menu'
                    aria-haspopup='true'
                    color='inherit'
                    onClick={e => setAnchorEl(e.currentTarget)}
                    sx={sx}>
                    <Avatar
                        sx={{
                            backgroundColor: 'black',
                            width: 30,
                            height: 30,
                        }}>
                        <PersonAddIcon />
                    </Avatar>
                </IconButton>
            </NavbarTooltip>
            <StyledPopover
                open={open}
                onClose={handleMenuClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={emailSchema}
                    onSubmit={values => handleAddFriend(values.email)}
                >
                    {
                        ({ values, onBlur, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Input
                                    placeholder='friend@email.com'
                                    sx={{ color: 'white', p: 2 }}
                                    type='text'
                                    id='email'
                                    name='email'
                                    label='Email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={onBlur}
                                    autoComplete='off'
                                    autoFocus
                                />
                                <Button color='secondary'
                                    type='submit'
                                    sx={{ textTransform: 'capitalize' }}>
                                    <Typography>
                                        Add
                                    </Typography>
                                </Button>
                            </form>
                        )
                    }
                </Formik>
            </StyledPopover>
        </>
    )
}