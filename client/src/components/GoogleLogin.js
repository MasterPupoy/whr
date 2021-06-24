import React from 'react';
import { GoogleLogin } from 'react-google-login';

export default function GoogleLoginButton({text, classes }){

  const authenticateGoogleLogin = () => {

  }

  return (
    <GoogleLogin 
      clientId='357723066529-kv0gd2tf8gqbglv56kfe48h8hos6259f.apps.googleusercontent.com'
      buttonText={text}
      onSuccess={authenticateGoogleLogin}
      onFailure={authenticateGoogleLogin}
      cookiePolicy={'single_host_origin'}
      className={classes}
    />
  )
}