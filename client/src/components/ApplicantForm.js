import React, { useRef } from 'react';
import { Button, Form, Row, Col, Tab, Nav, Badge } from 'react-bootstrap';
import { FaMicrophone } from 'react-icons/fa'
import { BsPeopleCircle } from 'react-icons/bs';
import { GATEWAY_URL } from '../helper';
import Swal from 'sweetalert2';
import './component_styles/applicantForm.css'

export default function ApplicationForm({ candidate, onClick }){
  const interview_date = useRef(null);

  const setInterviewSchedule = () => {
    
    fetch(`${GATEWAY_URL}/apply/openings/${candidate?._id}`,{
      method : 'PUT',
      headers :{
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        interview_date: interview_date.current.value,
        status : 2
      })
    }).then(res => res.json()).then(data => {
      if(data){

        Swal.fire({
          icon: 'success',
          title: 'Interview Scheduled',
        })

        onClick();

      }else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    })
  }

  return (
    <div>
      <h3>
        <BsPeopleCircle/> {candidate?.first_name} {candidate?.last_name}
        {(candidate?.hired) ? <Badge style={{marginLeft : '50px'}} variant='success'>Hired</Badge> : null}
        {(candidate?.rejected) ? <Badge style={{marginLeft : '50px'}} variant='danger'>Rejected</Badge> : null}
        {(candidate?.for_interview && !candidate?.hired) ? 
          <Badge style={{marginLeft : '50px'}} variant='warning'>For Interview</Badge> 
          : 
          null
        }
      </h3>
      <div style={{padding : '20px'}}>
        <h5>Position: {candidate?.job_id.title}</h5>
        <h5>Type : {candidate?.job_id.type}</h5>
        <h5>Salary : {candidate?.job_id.salary}</h5>
        <div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first" style={{ background : '#fff'}}>
            <Row >
              <Col sm={3}>
                <Nav variant="pills" className="flex-column candidate_small">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Personal</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Professional Information</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content style={{ background : '#fff'}}>
                  <Tab.Pane eventKey="first" >
                    <div className='candidate_info'>
                      <p>
                        <strong>Official Email</strong> : {candidate?.official_email}<br />
                        <strong>Phone Number</strong> : {candidate?.phone_numbers}<br />
                        <strong>Date Of Birth</strong> : {candidate?.date_of_birth}<br />
                        <strong>Gender</strong> : {candidate?.gender}<br />

                        
                      </p>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second" >
                    <div className='candidate_info'>
                      <p>
                        <strong>Official Email</strong>  : {candidate?.official_email}<br />
                        <strong>Applied On</strong>  : {candidate?.applied_on}<br />
                        <strong>Experiences</strong>   : <br />
                        {candidate?.experiences}
                        <strong>Expected Salary</strong>   : {candidate?.expected_compensation}<br />
                        <strong>Message</strong>   : <br />
                        {candidate?.message}
                        
                        <a href={`${GATEWAY_URL}/file?path=${candidate?.resume}`} download>
                          <Button variant='info'>View Resume'</Button>
                        </a>
                      </p>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
        {(!candidate?.reviewed) ? 
          <Row>
          <h3><FaMicrophone /> Set Interview</h3>
            <Form.Group as={Col} controlId="date_of_birth">
              <Form.Label>Set Interview Date</Form.Label>
              <Form.Control type="date" placeholder="Select One" ref={interview_date} required/>
            </Form.Group>
          </Row>

          :

          null
          
        }
       
      </div>
      {(!candidate?.reviewed) ?
        <Button className='set_interview_button' onClick={setInterviewSchedule}>Set Interview</Button>
       :
        null
      }
      <Button className='set_cancel_button' onClick={onClick}>Close</Button>
    </div>
  )
}