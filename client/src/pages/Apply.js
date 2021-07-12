import React, { useEffect, useState, useRef } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Navbar, Nav, Container, Spinner, Form, Row, Col, Button } from 'react-bootstrap';
import { AiOutlineForm } from 'react-icons/ai';
import { GATEWAY_URL } from '../helper';
import whr_small from '../static/whr3_small.png';
import Swal from 'sweetalert2';

export default function ApplicationModal(props){
  const [job, setJob] = useState();
  const first_name = useRef(null);
  const last_name = useRef(null);
  const date_of_birth = useRef(null);
  const gender = useRef(null);
  const phone_number = useRef(null);
  const official_email = useRef(null);
  const street = useRef(null);
  const province = useRef(null);
  const city = useRef(null);
  const zip_code = useRef(null);
  const message = useRef(null);
  const expected_compensation = useRef(null);
  const [file, setFile] =  useState();
  const [sucess, setSuccess] = useState(false);

  let { id } = useParams();
  
  useEffect(() => {
    
    fetch(`${GATEWAY_URL}/apply/jobs/${id}`, {
      method: 'GET'
    }).then(res => res.json()).then(data => setJob(data));

  }, [id]);


  const apply = async (e) => {
    e.preventDefault()
    console.log('fired');

    await fetch(`${GATEWAY_URL}/apply/openings/register`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        company_id: `${job.company_id._id}`,
        job_id: `${job._id}`,
        first_name: first_name.current.value.trim(),
        last_name: last_name.current.value.trim(),
        date_of_birth: date_of_birth.current.value.trim(),
        gender: gender.current.value.trim(),
        phone_numbers: Number(phone_number.current.value.trim()),
        designation: `${job.title}`,
        official_email: official_email.current.value.trim(),
        address: {
          street: street.current.value.trim(),
          province: province.current.value.trim(),  
          city: city.current.value.trim(),
          zip_code: zip_code.current.value.trim(),
        },
        expected_compensation: expected_compensation.current.value.trim(),
        message: message.current.value.trim(),
        })
      }).then(res => res.json()).then(applicant => {

       if(file){
        let formData = new FormData()
        formData.append('file', file);
          
        return fetch(`${GATEWAY_URL}/file/upload/${applicant._id}`, {
          method: 'POST',
          body : formData
        }).then(res => res.text()).then(data => (data) ? setSuccess(true) : null);
       }

       const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Application Sent'
        })
        
       return setSuccess(true)
      });
  };

  if(sucess){
    return <Redirect to='/openings' />
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img 
            src={whr_small} 
            alt='whr logo' 
            style={{
              width: '100px',
              height: '35px',
              borderRadius: '3px',
              marginLeft: '5px'

            }}
          /> 
        </Navbar.Brand>
        <Nav className="mx-auto">
          <Nav.Link style={{paddingRight: '50px'}} href="/openings">Careers</Nav.Link>
          <Nav.Link style={{paddingRight: '50px'}} href="/Register">Register</Nav.Link>
          <Nav.Link style={{paddingRight: '50px'}} href="/login">Login</Nav.Link>
        </Nav>
      </Navbar>
      <br />

      <Container>
        {(job) ?  
          <>
            <div>
              <h3>{job.title}</h3>
              <p>{job.company_id.company_name} | {job.company_id.industry} industry</p>
              <h4>{job.salary}</h4>
              <h4 style={{paddingTop : '30px'}}>Description</h4>
              <p>{job.description}</p>
              <h5 style={{paddingTop : '30px'}}>Experience required</h5>
              <p>{job.experience}</p>
              <h5>Type</h5>
              <p>{job.type}</p>
            </div>
            <hr />
            <div style={{padding : '30px 40px'}}>
              <Form onSubmit={apply}>
                <h3><AiOutlineForm /> Application Form</h3>

                <Form.Group controlId="first_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Firstname" ref={first_name} required/>
                </Form.Group>

                <Form.Group controlId="last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Lastname" ref={last_name} required/>
                </Form.Group>

                <Form.Group controlId="official_email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="text" placeholder="Email Address" ref={official_email} required/>
                </Form.Group>

                <Form.Group  controlId="date_of_birth">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" placeholder="Select One" ref={date_of_birth} required/>
                </Form.Group>

                <Row>

                  <Form.Group as={Col} controlId="Gender">
                    <Form.Label>Gender</Form.Label>
                      <Form.Control as="select" placeholder="Select One" ref={gender}>
                        <option>Select One</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Prefer not to say</option>
                      </Form.Control>
                  </Form.Group>

                </Row>
                  <Form.Group  controlId="phone_number">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Mobile number" ref={phone_number} required/>
                  </Form.Group>

                <Row>

                  <Form.Group as={Col} controlId="street">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" placeholder="street" ref={street} required/>
                  </Form.Group>

                  <Form.Group as={Col} controlId="street">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="city" ref={city} required/>
                  </Form.Group>

                  <Form.Group as={Col} controlId="street">
                    <Form.Label>Province</Form.Label>
                    <Form.Control type="text" placeholder="province" ref={province} required/>
                  </Form.Group>

                  <Form.Group as={Col} controlId="zip_code">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="text" placeholder="Zip Code" ref={zip_code} required/>
                  </Form.Group>
                </Row>
                 

                <Form.Group controlId="street">
                  <Form.Label>Expected salary</Form.Label>
                  <Form.Control type="text" placeholder="Compensation" ref={expected_compensation} />
                </Form.Group>

                <Form.Group controlId="message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={6} ref={message} />
                </Form.Group>

                <Form.Group controlId="formFile" style={{paddingTop : '30px'}} className="mb-3">
                  <Form.Label>Upload Resume</Form.Label>  
                  <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} disabled/>
                </Form.Group>

                <Button type='submit' variant='success'>Apply</Button>
                <Button style={{marginLeft : '10px'}} variant='danger'>Cancel</Button>
              </Form>

            </div>
          </>
        : 
          <div style={{ textAlign: 'center'}}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden"></span>
            </Spinner>
          </div>
        }
      </Container>
    </>
  )
}