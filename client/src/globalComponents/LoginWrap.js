import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../context/Auth'

export default function LoginWrap({ children }) {
    const [checked, setChecked] = useState(null)
    const { user } = useAuth()
    const location = useLocation()

    useEffect(() => {
        setChecked('checked')
        if (location.state) {
            console.log('Redirected from: ' + location.state.from.pathname)
        }
    })
    const toLocation = location.state ? location.state.from.pathname : 'calendar'
    return (
        <>
        {
            checked && user ? <Navigate to={toLocation}/> : children
        }
        </>
    )
} 