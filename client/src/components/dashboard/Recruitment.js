import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Tab, Card, Spinner, Table, Button } from 'react-bootstrap';
import Title from '../Title';
import { RiBriefcase2Fill } from 'react-icons/ri';
import { GiOfficeChair } from 'react-icons/gi';
import { WiWindy, WiMoonAltFull } from 'react-icons/wi';
import { GATEWAY_URL } from '../../helper';
import companyContext from '../../contexts/companyContext';
import CustomButton from '../CustomButton';
import './css/recruitment.css'
import JobForm from '../JobForm';
import SlideModal from '../SlideModal';

export default function Recruitment(){
  const [key, setKey] = useState('jobs');
  const [jobs, setJobs] = useState();
  const [candidates, setCandidates] = useState();
  const [talent_pool, setTalentPool] = useState();
  const [show, setShow] = useState(false);
  const company = useContext(companyContext);

  useEffect(() => {
    if(key === 'jobs'){

      fetch(`${GATEWAY_URL}/apply/jobs/organization/${company._id}`, {
        method : 'GET'
      }).then(res => res.json()).then(data => setJobs(data));

    };

    if(key === 'candidates'){
      
      fetch(`${GATEWAY_URL}/apply/openings/applications/${company._id}`, {
        method: 'GET'
      }).then(res => res.json()).then(data => {
        setCandidates(data);
      });

    };

    if(key === 'talent_pool'){

      fetch(`${GATEWAY_URL}/apply/openings/applications/all/${company._id}`, {
        method: 'GET'
      }).then(res => res.json()).then(data => {
        console.log(data)
        setTalentPool(data);
      });
    };


  }, [key, company._id]);
  

  return(
    <>
    <Title icon={<RiBriefcase2Fill />} title='Recruitment' />
    <div className='add_posting'>
      <CustomButton 
        text='+ Add New'
        classes='someButton' action={() => setShow(prevState => !prevState)} />
    </div>
    <SlideModal show={show} modalStyle='recruitment_modal_Style'>
        <JobForm onClick={() => setShow(prevState => !prevState)} />
    </SlideModal> 
    <div className='tab-container'>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="jobs" title="Jobs" tabClassName='tab_head'>
            {(jobs) ? 
                <div className='higherdiv'>
                {(jobs.length > 0) ? 
                    <div className='jobs_container'>{
                        jobs.map((jobs, i) => {
                          return (
                            <Card key={i} style={{ 
                              width: '18rem',
                              margin: '10px'
                              }}>
                              <Card.Body bsPrefix='card_below'>
                                <Card.Title>{jobs.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Declared Salary : {jobs.salary}</Card.Subtitle>
                                <Card.Text className='text-center'>
                                  <span>{jobs.applications}</span>
                                  <br />
                                  <span>Applications</span>
                                </Card.Text>
                                <Button className='interact_button' variant='warning'>Close Position</Button>
                                <Button className='interact_button' variant='dark'>See Details</Button>
                              </Card.Body>
                            </Card>
                          );
                        })
                      }
                    </div>
                    :
                    <div className='filler'>
                      <GiOfficeChair className='icon' /><br />
                      <h3>No job posting at this moment</h3>
                    </div>
              }
              </div>
              : 
              <div className='spinner_container'>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            }
        </Tab>
        <Tab eventKey="candidates" title="Candidates">
          {(candidates) ? 
                <div className='higherdiv'>
                  {(candidates.length > 0) ? 
                    <div className='jobs_container'>
                      <Table  hover>
                        <thead>
                          <tr>
                            <th>Position Applied</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th
                              style={{
                                textAlign : 'center'
                              }}
                            >
                              Application Status
                            </th>
                            <th>Expected Compensation</th>
                            <th>Phone Number</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        {candidates.map((candidate, i) => {
                          return (   
                                <tr key={i}>
                                  <td>{candidate.job_id.title}</td>
                                  <td>{candidate.first_name}</td>
                                  <td>{candidate.last_name}</td>
                                  <td>{candidate.official_email}</td>
                                  <td
                                    style={{
                                      textAlign : 'center'
                                    }}
                                  >
                                    {candidate.application_status}
                                  </td>
                                  <td>{candidate.expected_compensation}</td>
                                  <td>{candidate.phone_numbers}</td>
                                  <td><button className='interview_button'>Set Interview</button></td>
                                  <td><button className='reject_button'>Reject</button></td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </div>
                    :
                    <div className='filler'>
                      <WiWindy className='icon' /><br />
                      <h3>No candidates attracted so far</h3>
                    </div>
                }
                </div>
                : 
                <div className='spinner_container'>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              }
        </Tab>
        <Tab eventKey="talent_pool" title="Talent Pool">
        {(talent_pool) ? 
                <div  className='higherdiv'>
                  {(talent_pool.length > 0) ? 
                    <div className='jobs_container'>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Position Applied</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th 
                              style={{
                                textAlign : 'center'
                              }}
                            >
                              Application Status
                            </th>
                            <th>Expected Compensation</th>
                            <th>Phone Number</th>
                            <th>Rejected</th>
                          </tr>
                        </thead>
                        <tbody>
                        {talent_pool.map((candidate, i) => {
                          return (   
                                <tr key={i}>
                                  <td>{candidate.job_id.title}</td>
                                  <td>{candidate.first_name}</td>
                                  <td>{candidate.last_name}</td>
                                  <td>{candidate.official_email}</td>
                                  <td
                                    style={{
                                      textAlign : 'center'
                                    }}
                                  >
                                    {candidate.application_status}
                                  </td>
                                  <td>{candidate.expected_compensation}</td>
                                  <td>{candidate.phone_numbers}</td>
                                  <td>{(candidate.rejected) ? 'YES' : 'NO'}</td>
                                  <td><button className='interview_button'>Contact</button></td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </div>
                    :
                    <div className='filler'>
                      <WiMoonAltFull className='icon' /><br />
                      <h3>Pool is empty</h3>
                    </div>
                }
                </div>
                : 
                <div className='spinner_container'>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              }
        </Tab>
      </Tabs>
    </div>
    </>
  )
}