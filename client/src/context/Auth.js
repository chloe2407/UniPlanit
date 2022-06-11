import React, { createContext, useMemo, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [err, setErr] = useState()
    const navigate = useNavigate()

    const login = (values) => {
        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUser(data)
                // not sure why this is broken, hard coded for now
                // navigate(location.state.from || '/')
                navigate('/')
            }
            )
            .catch(err => setErr(err))
    }

    const signup = (values) => {
        fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                setUser(data)
                navigate('/')
            })
    }

    const logout = () => {
        fetch('/users/logout', {
            method: 'POST'
        })
            .then(() => setUser(null))
    }

    const memo = useMemo(() => ({
        user, err, login, signup, logout
    }), [user, err])

    return (
        <AuthContext.Provider value={memo}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    // allows you to use all the values provided by the provider
    return useContext(AuthContext)
}