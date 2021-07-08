import React, { useRef } from 'react';
import { Form, Col, Button, Row, Tab, Nav } from 'react-bootstrap';
import { IoRocket } from 'react-icons/io5';
import { GATEWAY_URL } from '../helper';
import Swal from 'sweetalert2';
import './component_styles/hireForm.css'; 

export default function HireForm({ candidate, onClick }){
  const compensation = useRef(null);
  const joining_date = useRef(null);


  const hireCandidate = (e) => {
    e.preventDefault();

    fetch(`${GATEWAY_URL}/apply/openings/hire/${candidate._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        joining_date: joining_date.current.value,
        remote: candidate.job_id.remote,
        compensation: compensation.current.value
      })
    }).then(res => res.json()).then(data => {

      if(data){
        Swal.fire(
          `Random Password Generated 
          for ${data.email} : ${data.password}`
        )
        onClick();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })

      }
    });
  }

  return(
    <div>
      <h3><IoRocket /> Hire Candidate</h3>
      <div style={{ paddingTop : '20px'}}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" style={{ background : '#fff'}}>
          <Row >
            <Col sm={3}>
              <Nav variant="pills" className="flex-column candidate_small">
                <Nav.Item>
                  <Nav.Link eventKey="first">Job Offer</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Job Description</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content style={{ background : '#fff'}}>
                <Tab.Pane eventKey="first" >
                  <div className='job_info'>
                    <p>
                      <strong>Position</strong> :  {candidate?.job_id.title}<br />
                      <strong>Type</strong> : {candidate?.job_id.type}<br />
                      <strong>Salary</strong> : {candidate?.job_id.salary}<br />
                    </p>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second" >
                  <div className='job_info'>
                    <h5>Job Description</h5>
                    <p>
                      {candidate?.job_id.description}
                    </p>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        </div>
        <Form onSubmit={hireCandidate}>
          <Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="email" placeholder={candidate?.first_name} readOnly/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="password" placeholder={candidate?.last_name} readOnly  />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Official Email</Form.Label>
              <Form.Control type='email' placeholder={candidate?.official_email} readOnly/>
            </Form.Group>

            <Form.Group as={Col} controlId="starting">
              <Form.Label>Starting Date</Form.Label>
              <Form.Control type='date' ref={joining_date} />
            </Form.Group>

            <Form.Group as={Col} controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control type='text' ref={compensation} placeholder={candidate?.job_id.salary} defaultValue={candidate?.job_id.salary} />
            </Form.Group>
        </Row>
        
        <Button variant="primary" type="submit">
          <IoRocket /> Hire Candidate
        </Button>
        <Button variant='danger' onClick={onClick}>Close</Button>
      </Form>
    </div>
  )

}