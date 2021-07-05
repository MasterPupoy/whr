import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GATEWAY_URL } from '../helper';
import whr from '../static/whr3.png';
import whr_small from '../static/whr3_small.png';
import { GiConqueror } from 'react-icons/gi';
import '../css/careers.css';
import '../css/openings.css';


export default function Careers(){
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`${GATEWAY_URL}/apply/jobs/all`,{
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      }
    }).then(res => res.json()).then(data => setJobs(data))
  }, []);


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
                        <Link
                          className='apply_now_button'
                          to={`/apply/${job._id}`}
                        >
                          Apply Now!
                        </Link>
                      </Col>
                  </Row>
                  )
                })}
              </div>
              : 
              <div style={{ textAlign: 'center'}}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            }
          </div>
          :
          <div>
            <GiConqueror /><br />
            <h3>Hang in there! Opportunities are coming your way.</h3>
          </div>
        }

      </Container>
    </>
  )
}