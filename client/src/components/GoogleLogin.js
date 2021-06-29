import React from 'react';
import { GoogleLogin } from 'react-google-login';

export default function GoogleLoginButton({text, classes, authenticateGoogleLogin }){

  return (
    <GoogleLogin 
      clientId='842483895353-150apkaevqhkd24hv70rqf13v2if15no.apps.googleusercontent.com'
      buttonText={text}
      onSuccess={authenticateGoogleLogin}
      onFailure={authenticateGoogleLogin}
      cookiePolicy={'single_host_origin'}
      className={classes}
    />
  )
}