import React from 'react'
import useAuth from '../context/Auth' 
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAuth ({ children }) {
    const { user } = useAuth()
    const location = useLocation()
    if (!user){
        console.log(location)
        return <Navigate to='/login' replace state={{from: location}}/>
    }
    return children
}