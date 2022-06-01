import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";


const Landing = () => {
    const navigate = useNavigate();
    const goToLogIn = () => navigate('/login');
    const goToSignUp = () => navigate('/signup');
    const goToCal = () => navigate('/calendar');
    
    return (
        <div>
            <Button onClick={goToLogIn}>Login</Button>
            <Button onClick={goToSignUp}>Sign Up</Button>
            <Button onClick={goToCal}>Calendar</Button>
        </div>
        
    )
}

export default Landing;