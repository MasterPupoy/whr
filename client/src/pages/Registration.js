import React  from "react"
import { Form } from 'react-bootstrap';
import CustomButton from "../components/CustomButton";
import GoogleLoginButton from "../components/GoogleLogin";
import '../css/register.css'

export default function Register(){
  return (
    <div className='register-container'>
      <div className='register-card'>
        <Form className="register-form">
          <Form.Group className="mb-3" controlId="company_name">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="email" placeholder="Company" />
          </Form.Group>

           <Form.Group className="mb-3" controlId="fullname">
            <Form.Label>Fullname</Form.Label>
            <Form.Control type="email" placeholder="Fullname" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="example@mail.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="verifyPassword">
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