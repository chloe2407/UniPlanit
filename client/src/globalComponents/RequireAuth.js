import React, { useEffect, useState } from 'react'
import useAuth from '../context/Auth'
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAuth({ children }) {
    const { user, checkLoggedIn } = useAuth()
    const location = useLocation()
    const [checked, setChecked] = useState('loading')

    useEffect(() => {
        // console.log(user)
        setChecked('checked')
    }, [])
    return (
        <>
            {
                checked && user ? children : <Navigate to='/login' replace state={{ from: location }} />
            }
        </>
    )

}