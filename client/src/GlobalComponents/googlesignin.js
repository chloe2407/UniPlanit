import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router';

const clientId = '880488143911-tt27hkkdnpenshv9cul0p1ga56j4f84f.apps.googleusercontent.com';

const GoogleSignIn = () => {
    const navigate = useNavigate();
    const goToCal = () => navigate('/calendar');

    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
        goToCal()

    };
    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };
    return (
        <div>
            <GoogleLogin 
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '5vh 10vw'}}
                isSignedIn={true}
            />
            
        </div>
    );   
}

export default GoogleSignIn;