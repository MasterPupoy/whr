import React, { useContext, useEffect, useState } from 'react';
import { Table, ListGroup } from 'react-bootstrap';
import { BsPeopleFill } from 'react-icons/bs';
import { IoMdPersonAdd } from 'react-icons/io';
import { GiAbstract050 } from 'react-icons/gi';
import { MdDateRange } from 'react-icons/md';
import Title from '../Title';
import './css/metrics.css'; 
import userContext from '../../contexts/userContext';
import companyContext from '../../contexts/companyContext';
import { GATEWAY_URL } from '../../helper';

export default function Metrics(){
  const elevated = useContext(userContext);
  const company = useContext(companyContext);
  const company_id = localStorage.getItem('cid');
  const [interviews, setInterviews] = useState([]);
  const [celebrators, setCelebrators] = useState([]);

  useEffect(() => {     
    fetch(`${GATEWAY_URL}/apply/openings/applications/${company_id}`, {
      method: 'GET'
    }).then(res => res.json()).then(data => {
      console.log(data)
      
      let interviews = []

      data.forEach(candidate => {
        if(candidate.for_interview && !candidate.hired && !candidate.rejected){
          interviews.push(candidate);
        }
      });

      console.log(interviews);
      setInterviews(interviews);

    });

    fetch(`${GATEWAY_URL}/whr/employee/employees`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `${localStorage.getItem('act')}`
      },
      body : JSON.stringify({
        company_id : company_id
      })
    }).then(res => res.json()).then(data => {
    
    
    
    });

  }, [])
  
  return(
    <>
     <Title icon={<GiAbstract050 />} title='My Dashboard' />
     <div className='table-head'>
      <h5>Hey there {elevated?.first_name}!</h5>
      <span className='time'> Your last login was {(elevated?.last_login) ? elevated.last_login : 'just now'}</span>
     </div>
      {(elevated?.owner === true) ? 
        <>
          <div className='first-metric-container'>
            <div className='interview-table'>
              <h5 className='table-head'>Interviews</h5>
              {(interviews?.length > 0) ? 
                <Table hover>
                    <thead>
                      <tr>
                        <th>Applicant</th>
                        <th>Email</th>
                        <th>Position Applied</th>
                        <th>Interview Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interviews.map((candidate, i) => {
                        let date = new Date(candidate.interview_date).toString()
            
                        return (                      
                          <tr>
                            <td>{candidate.first_name} {candidate.last_name}</td>
                            <td>{candidate.official_email}</td>
                            <td>{candidate.designation}</td>
                            <td>{date.slice(0, 16)}</td>
                          </tr>                                            
                        )
                      })}                     
                    </tbody>
                </Table>
                :
                <div className='interview_filler'>
                  <MdDateRange className='icon' /><br />
                  <h3>No interviews so far</h3>
                </div>

              }
            </div>

            <div className='interview-table'>
              <h5 className='table-head'>Celebration Corner</h5>
              <Table striped bordered hover>
                  {/*<thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                  </tbody>*/}
              </Table>
            </div>
            
            <div className='interview-table'>
              <h5 className='table-head'>New Joinees - <span className='muted'>Last 7 Days</span></h5>
              <Table striped bordered hover>
                  {/*<thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                  </tbody>*/}
              </Table>
            </div>

          </div>

          <div className='second-metric-container'>
            <ListGroup className='event-list' defaultActiveKey="#link1">
              <ListGroup.Item className='event-head'>
                <BsPeopleFill />  Candidates Summary
              </ListGroup.Item>
              <ListGroup.Item>
                New Candidates
              </ListGroup.Item>
                <ListGroup.Item>
                Waiting For my Action 
              </ListGroup.Item>
            </ListGroup>

            <ListGroup className='event-list' defaultActiveKey="#link1">
              <ListGroup.Item className='event-head'>
                <IoMdPersonAdd />  Offer to hire highlights
              </ListGroup.Item>
              <ListGroup.Item>
                Offers Made
              </ListGroup.Item>
                <ListGroup.Item>
                Offers Accepted
              </ListGroup.Item>
            </ListGroup>
            
          </div>
        </>
        :
        <div className='first-metric-container'>
          <div className='interview-table'>
            <h5 className='table-head'>Workplace @ <span className='title'>{company?.company_name}</span></h5>
            <Table striped bordered hover>
                {/*<thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>*/}
            </Table>
          </div>
        </div>
      }
    </>  
  )
}