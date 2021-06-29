import React, { useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import CustomButton from '../components/CustomButton';
import GoogleLoginButton from '../components/GoogleLogin';
import Alert from '../components/Alert';
import '../css/login.css';
import { GATEWAY_URL } from '../helper';

export default function Login(){
  const loginEmail = useRef(null);
  const loginPassword = useRef(null);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  // success state to fire the redirect on state change
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (success) {
    return <Redirect to='/dashboard' />
  }

  /* 
    login on submit with the email and password 
    obtained from useRef then store the user id, token 
    and company id on userContext. 
  */

  const onLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    
    if(!loginEmail.current.value || !loginPassword.current.value){
      setShowError(true);
      setError('Invalid username or password');
      
      return setLoading(false);
    };

    await fetch(`${GATEWAY_URL}/whr/employee/login`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email: loginEmail.current.value,
        password: loginPassword.current.value
      })
    }).then(res => res.json()).then(data => { 
      
      if(data.error){
        setShowError(true);
      };

      localStorage.setItem('id', data.id);
      localStorage.setItem('cid', data.cid);
      localStorage.setItem('token', data.access);
      setSuccess(true);
     
    });
  };

  const googleAuthentication = async (response) => {
    setLoading(true);
    console.log(response);

    await fetch(`${GATEWAY_URL}/whr/employee/googleLogin`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        tokenId: response.tokenId
      })
    }).then(res => res.json()).then(data => {
      console.log(data)

      if(data.error){
        setShowError(true);
        setError('Your email is not registered to any organization');
        setLoading(false);
      }else{
        localStorage.setItem('id', data.id);
        localStorage.setItem('cid', data.cid);
        localStorage.setItem('token', data.access);
        setSuccess(true);
      };
    });
  };

  return (
    <div className="page-container">
      <div className="login-container">

        <Alert 
          classes='login-alert' 
          text={error}
          show={showError} 
          onClick={() => setShowError(prevState => !prevState)}  
        />

        <div className="login-card">
          <Form className="login-form" onSubmit={onLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" ref={loginEmail} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref={loginPassword} />
            </Form.Group>

            <CustomButton 
            text="Log-in"
            isLoading={loading}
            />
            
            <GoogleLoginButton 
              authenticateGoogleLogin={googleAuthentication}
              text="Sign-in with Google" 
              classes="google-login" 
            />

            <section>
              <span>Don't have an account? </span>
              <Link to="/register">Register now</Link>
            </section>

          </Form>
        </div> 
      </div>
    </div>
  );
};
