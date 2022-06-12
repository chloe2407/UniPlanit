import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../context/Auth'

export default function LoginWrap({ children }) {
    const [checked, setChecked] = useState(null)
    const { user } = useAuth()
    useEffect(() => {
        setChecked('checked')
    })
    return (
        <>
        {
            checked && user ? <Navigate to='/calendar'/> : children
        }
        </>
    )
} 