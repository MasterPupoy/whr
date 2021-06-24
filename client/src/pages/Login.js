import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import CustomButton from '../components/Button';
import GoogleLoginButton from '../components/GoogleLogin';
import '../css/login.css';


export default function Login(){

  return (
    <div className="login-container">
      <div className="login-card">
        <Form className="login-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <CustomButton 
            text="Log-in" 
          />
          <GoogleLoginButton 
            text="Sign-in with Google" 
            classes="google-login" 
          />
          <section>
            <span>Don't have an account? </span><Link to="/register">Register now</Link>
          </section>
        </Form>
      </div>
    </div>
  );
};
