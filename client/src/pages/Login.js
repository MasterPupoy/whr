import React, { useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import CustomButton from '../components/CustomButton';
import GoogleLoginButton from '../components/GoogleLogin';
import Alert from '../components/Alert';
import userContext from '../contexts/userContext';
import '../css/login.css';


export default function Login(){
  const loginEmail = useRef(null);
  const loginPassword = useRef(null);
  const [showError, setShowError] = useState(false);
  const [user, setUser] = useState('');

  

  /* 
    login on submit with the email and password 
    obtained from useRef then store the user id, token 
    and company id on userContext. 
  */

  const onLogin = async (e) => {
    e.preventDefault(); 
    
    const loginRes = await fetch(`http://localhost:5000/whr/employee/login`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email: loginEmail.current.value,
        password: loginPassword.current.value
      })
    }).then(res => res.json()).then(data => { 
      setUser(data);
    });


  }

  return (
    <div className="page-container">
      <div className="login-container">

        <Alert 
          classes='login-alert' 
          text='Invalid username or password' 
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
            />
            <GoogleLoginButton 
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
