import React  from "react"
import { Form } from 'react-bootstrap';
import CustomButton from "../components/Button";
import GoogleLoginButton from "../components/GoogleLogin";
import '../css/register.css'

export default function Register(){
  return (
    <div className='register-container'>
      <div className='register-card'>
        <Form className="register-form">
           <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Fullname</Form.Label>
            <Form.Control type="email" placeholder="Fullname" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="example@mail.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <CustomButton text="Register" />
          <GoogleLoginButton text="Sign-up with Google" />
        </Form> 
      </div>
    </div>
  )
}