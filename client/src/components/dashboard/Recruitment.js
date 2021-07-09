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
import ApplicationForm from '../ApplicantForm';
import HireForm from '../HireForm';
import Swal from 'sweetalert2';


export default function Recruitment(){
  const [key, setKey] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [talent_pool, setTalentPool] = useState([]);
  const [show, setShow] = useState(false);
  const [showCandidate, setShowCandidate] = useState(false);
  const [showHire, setHire] = useState(false)
  const [selected_candidate, setSelectedCandidate] = useState();
  const company = useContext(companyContext);
  const company_id = localStorage.getItem('cid');
  
  console.log(company)
  useEffect(() => {
    if(key === 'jobs'){
      
      /* 
      useContext tend to lag behind causing this fetch to
      send undefined companyId when using company._id.
      Will opt for local storage instead
      */
     fetch(`${GATEWAY_URL}/apply/jobs/organization/${localStorage.getItem('cid')}`, {
       method : 'GET'
      }).then(res => res.json()).then(data => setJobs(data));
      
    };
    
    if(key === 'candidates'){
      
      fetch(`${GATEWAY_URL}/apply/openings/applications/${company_id}`, {
        method: 'GET'
      }).then(res => res.json()).then(data => {
        setCandidates(data);
      });
      
    };
    
    if(key === 'talent_pool'){
      
      fetch(`${GATEWAY_URL}/apply/openings/applications/all/${company_id}`, {
        method: 'GET'
      }).then(res => res.json()).then(data => {
        setTalentPool(data);
      });
    };
    
    
  }, [key, company_id]);
  
  const setInterview = (candidate) => {
    
    setSelectedCandidate(candidate);
    setShowCandidate(prevState => !prevState); 
  }
  
  const hireCandidate = (candidate) => {
    
    setSelectedCandidate(candidate);
    setHire(prevState => !prevState)
  };

  const rejectApplicant = (candidate) => {

    Swal.fire({
      title: `Reject candidate ${candidate.first_name} ?`,
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        fetch(`${GATEWAY_URL}/apply/openings/reject/${candidate?._id}`, {
          method : 'PUT'
        }).then(res => res.json()).then(data => {
          
          if(data){
            Swal.fire('Applicant Rejected')
            
            fetch(`${GATEWAY_URL}/apply/openings/applications/${company._id}`, {
              method: 'GET'
            }).then(res => res.json()).then(data => {
              setCandidates(data)
            });

          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }
        });
      } 
    });
  }
  

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
    <SlideModal show={showCandidate} modalStyle='recruitment_modal_Style'>
        <ApplicationForm candidate={selected_candidate} onClick={() => setShowCandidate(prevState => !prevState)} />
    </SlideModal>
    <SlideModal show={showHire} modalStyle='recruitment_modal_Style'>
        <HireForm candidate={selected_candidate} onClick={() => setHire(prevState => !prevState)} />
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
                                <p className='posted_by'>Posted by : {jobs.posted_by}</p>
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
                      <Table hover>
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
                              Applicant Status
                            </th>
                            <th>Expected Compensation</th>
                            <th>Phone Number</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        {candidates?.map((candidate, i) => {
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
                                    {(candidate.application_status === 1) ? 'Screening' : 'For Interview'}
                                  </td>
                                  <td>{candidate.expected_compensation}</td>
                                  <td>{candidate.phone_numbers}</td>
                                  <td>
                                    <button 
                                      className='interview_button' 
                                      onClick={() => setInterview(candidate)}
                                    >
                                        View Applicant
                                    </button>
                                  </td>
                                  <td>
                                    {(candidate.application_status === 2) ?
                                      <button 
                                      className='interview_button' 
                                      onClick={() => hireCandidate(candidate)}
                                      >
                                        Hire Candidate
                                     </button>
                                     :
                                     <Button 
                                      className='interview_button' 
                                      
                                      disabled
                                      >
                                        Hire Candidate
                                     </Button>
                          
                                    }
                                  </td>
                                  <td><button className='reject_button' onClick={() => { rejectApplicant(candidate) }}>Reject</button></td>
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
                      <Table hover>
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
                                    {(candidate.rejected) ? 'Rejected' : 'For Review'}
                                  </td>
                                  <td>{candidate.expected_compensation}</td>
                                  <td>{candidate.phone_numbers}</td>
                                  <td>
                                    <button 
                                    className='interview_button'
                                    onClick={() => setInterview(candidate)}
                                    >
                                      View Info
                                    </button>
                                  </td>
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