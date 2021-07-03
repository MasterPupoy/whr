import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Row, Col, Spinner, Button, Modal } from 'react-bootstrap';
import { GATEWAY_URL } from '../helper';
import whr from '../static/whr3.png';
import whr_small from '../static/whr3_small.png';
import '../css/careers.css';
import '../css/openings.css';
import SlideModal from '../components/SlideModal';

export default function Careers(){
  const [jobs, setJobs] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(`${GATEWAY_URL}/apply/jobs/all`,{
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      }
    }).then(res => res.json()).then(data => setJobs(data))
  }, []);

  const apply = (job_id, company_id) => {

  }

  console.log(show);

  return(
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
        <Row className='row_careers'>
          <Col>
            <img className='logo' src={whr} alt='whr logo' />
          </Col>            
          <Col>
            <h1 className='heading_top'>WHR Careers</h1>
            <p>
              Opportunities waiting for you by the companies that 
              trusts Working HR in collaborating with their
              employees.
            </p>
          </Col>
        </Row>
        <hr />
        {(jobs) ? 
          <div className='openings_container'>
            {(jobs.length > 0) ? 
              <div>{
                jobs.map((job, i) => {
                  return (
                  <Row key={i} className='row_openings'>
                      <Col>
                        <h3>{job.title}</h3>
                        <p>{job.company_id.company_name}</p>
                        <p>{job.company_id.industry} industry</p>
                      </Col>
                      <Col>
                        <h5>{job.experience}</h5>
                        <h5>{job.salary}</h5>
                        <h5>{job.type}</h5>
                        <p>{job.description}</p>
                        <Button 
                          style={{
                            marginLeft: '420px', 
                            padding: '5px 40px'
                          }} 
                          variant='success'
                          onClick={() => setShow(prevState => !prevState)}
                        >
                          Apply Now!
                        </Button>
                      </Col>
                  </Row>
                  )
                })}
              </div>
              : 
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            }
          </div>
          :
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }
  
      
      </Container>
    </>
  )
}