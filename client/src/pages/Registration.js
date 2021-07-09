import React, { useRef, useState }  from "react"
import { Redirect } from "react-router";
import { Form } from 'react-bootstrap';
import CustomButton from "../components/CustomButton";
import Alert from '../components/Alert';
import GoogleLoginButton from "../components/GoogleLogin";
import { GATEWAY_URL } from "../helper";
import Swal from 'sweetalert2';
import '../css/register.css'

export default function Register(){
  const company_name = useRef();
  const company_owner = useRef();
  const industry = useRef();
  const first_name = useRef();
  const last_name = useRef();
  const phone_numbers = useRef();
  const designation = useRef();
  const official_email = useRef();
  const password = useRef();
  const verify_password = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState(false);

  const register = async (e) => {
    e.preventDefault();

    setLoading(true);

    if(!(password.current.value === verify_password.current.value)){
      setError('Your passwords dont match');
      setShowError(true);
     return setLoading(false);
    }

    if(!(Number(phone_numbers.current.value))){
      setError('Phone number must be a valid number')
      setShowError(true)
      return setLoading(false);
    }

    await fetch(`${GATEWAY_URL}/whr/organization/register`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        company_name: company_name.current.value.trim(), 
        company_owner: company_owner.current.value.trim().toLowerCase(),  
        industry: industry.current.value.trim().toLowerCase(),  
        first_name: first_name.current.value.trim().toLowerCase(),  
        last_name: last_name.current.value.trim().toLowerCase(),  
        phone_numbers: phone_numbers.current.value.trim().toLowerCase(),  
        designation: designation.current.value.trim().toLowerCase(),  
        official_email: official_email.current.value.trim().toLowerCase(),  
        password: password.current.value.trim(),  
        verify_password: verify_password.current.value.trim(),  
      })
    }).then(res => res.json()).then(data => {
      if(data === true){
        setSuccess(true)
        Swal.fire({
            title: 'Registered!',
            text: 'Please login',
            icon: 'success',
            confirmButtonText: 'Got It'
        });
      };
    });
  };

  if(success) {
    return <Redirect to='/login' />
  };
  return (  
    <div className='register-container'>
      <div className='register-card'>
        <h3>Register</h3>
        <Form className="register-form" onSubmit={register}>
          <Form.Group className="mb-3" controlId="company_name">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" placeholder="Company Name" ref={company_name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Industry">
            <Form.Label>industry</Form.Label>
            <Form.Control type="text" placeholder="Industry" ref={industry} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fullname">
            <Form.Label>Owned By</Form.Label>
            <Form.Control type="text" placeholder="Owner of the Company" ref={company_owner} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Your First Name" ref={first_name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Your Last Name" ref={last_name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="designation">
            <Form.Label>Position</Form.Label>
            <Form.Control type="text" placeholder="Designation" ref={designation} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="phone_number">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="+639000000" ref={phone_numbers} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="example@mail.com" ref={official_email} required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={password} required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="verifyPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={verify_password} />
          </Form.Group>

          <CustomButton loading={loading} text="Register" />
          <GoogleLoginButton classes='google-login' text="Sign-up with Google" />
        </Form> 
        
      </div>

      <Alert 
          classes='login-alert' 
          text={error}
          show={showError} 
          onClick={() => setShowError(prevState => !prevState)}  
        />
    </div>
  )
}