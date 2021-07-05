import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar, Nav, Container, Spinner, Form, Row, Col, Button } from 'react-bootstrap';
import { AiOutlineForm } from 'react-icons/ai';
import { GATEWAY_URL } from '../helper';
import whr_small from '../static/whr3_small.png';

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

  let { id } = useParams();
  
  useEffect(() => {
    
    fetch(`${GATEWAY_URL}/apply/jobs/${id}`, {
      method: 'GET'
    }).then(res => res.json()).then(data => setJob(data));

  }, [id, job]);

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
            <div style={{paddingTop : '30px'}}>
              <Form >
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
                    <Form.Control type="text" placeholder="Lastname" ref={official_email} required/>
                  </Form.Group>

                  <Form.Group  controlId="date_of_birth">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" placeholder="Select One" ref={date_of_birth} />
                  </Form.Group>

                <Row>

                  <Form.Group as={Col} controlId="Gender">
                    <Form.Label>Sex</Form.Label>
                      <Form.Control as="select" placeholder="Select One" ref={gender}>
                        <option>Select One</option>
                        <option>Male</option>
                        <option>Female</option>
                      </Form.Control>
                  </Form.Group>

                  <Form.Group  controlId="phone_number">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Select One" ref={phone_number} />
                  </Form.Group>


                </Row>

                <Row>

                  <Form.Group as={Col} controlId="street">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" placeholder="Compensation" ref={street} required/>
                  </Form.Group>

                  <Form.Group as={Col} controlId="street">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Compensation" ref={city} required/>
                  </Form.Group>

                  <Form.Group as={Col} controlId="street">
                    <Form.Label>Province</Form.Label>
                    <Form.Control type="text" placeholder="Compensation" ref={province} required/>
                  </Form.Group>

                </Row>
                 
                <Form.Group controlId="zip_code">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control type="text" placeholder="Zip Code" ref={zip_code} required/>
                </Form.Group>

                <Form.Group as={Col} controlId="street">
                  <Form.Label>Expected salary</Form.Label>
                  <Form.Control type="text" placeholder="Compensation" ref={expected_compensation} />
                </Form.Group>

                <Form.Group controlId="message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={6} ref={message} />
                </Form.Group>

                <Button type='submit' variant='success'>Apply</Button>
                <Button variant='danger'>Cancel</Button>
              </Form>

            </div>
          </>
        : 
          <div style={{ textAlign: 'center'}}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        }
      </Container>
    </>
  )
}