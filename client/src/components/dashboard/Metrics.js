import React, { useContext, useEffect, useState } from 'react';
import { Table, ListGroup, Badge } from 'react-bootstrap';
import { BsPeopleFill } from 'react-icons/bs';
import { IoMdPersonAdd } from 'react-icons/io';
import { GiAbstract050 } from 'react-icons/gi';
import { MdDateRange } from 'react-icons/md';
import Title from '../Title';
import './css/metrics.css'; 
import userContext from '../../contexts/userContext';
import companyContext from '../../contexts/companyContext';
import { GATEWAY_URL } from '../../helper';
import { HiOutlineCake } from 'react-icons/hi';
import { GiPartyPopper, GiGlassCelebration } from 'react-icons/gi';

export default function Metrics(){
  const elevated = useContext(userContext);
  const company = useContext(companyContext);
  const company_id = localStorage.getItem('cid');
  const id = localStorage.getItem('id')
  const [interviews, setInterviews] = useState([]);
  const [celebrators, setCelebrators] = useState([]);
  const [joinees, setJoinees] = useState([]);
  const [candidateCount, setCount] = useState();
  const [waiting, setWaiting] = useState();
  const [unread, setUnread] = useState();

  useEffect(() => {     
    fetch(`${GATEWAY_URL}/apply/openings/applications/${company_id}`, {
      method: 'GET'
    }).then(res => res.json()).then(data => {
      let newCandidate = [];
      let waiting = [];

      data.forEach(candidate => {
        if(candidate.application_status === 1 && !candidate.rejected){
          newCandidate.push(candidate);
        }

        if(candidate.for_interview && !candidate.hired){
          waiting.push(candidate);
        }
      });
      
      let interviews = []

      data.forEach(candidate => {
        if(candidate.for_interview && !candidate.hired && !candidate.rejected){
          interviews.push(candidate);
        }
      });

      setInterviews(interviews);
      setCount(newCandidate.length)
      setWaiting(waiting.length);

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

      let celebrants = []
      
      data.forEach(employee => {
        if(employee.date_of_birth){
          let date = new Date();
          let birthdate = new Date(employee.date_of_birth)

          let today = [date.getMonth(), date.getDate()]

          let bdate = [birthdate.getMonth(), birthdate.getDate()]

          if(today.join('') === bdate.join('')){
            celebrants.push(employee);
          }
        }      
      });

      setCelebrators(celebrants);
    
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

        let joiners = [] 

        data.forEach(employee => {

          if(employee.joining_date){
            let today = new Date().getTime();
            let weekAgo = today - 640048770;
            let hiredOn = new Date(employee.joining_date).getTime();
        
          if(hiredOn <= today && hiredOn >= weekAgo){
            joiners.push(employee);
            } 
          }
        })

        setJoinees(joiners);
      });

      fetch(`${GATEWAY_URL}/email/delivery/inbox/${id}`, {
        method : 'GET'
      }).then(res => res.json()).then(data => setUnread(data.length));

  }, [company_id, id])
  
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
              <h5 style={{background : '#3b4371', color : '#fff'}} className='table-head'>Interviews</h5>
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
              <h5 style={{background : '#3b4371', color : '#fff'}} className='table-head'>Celebration Corner</h5>
              {(celebrators.length > 0) ? 
                <Table hover>
                    <thead>
                      <th><strong>Happy Birthday to </strong></th>
                    </thead>
                    <tbody>
                      {celebrators.map((candidate, i) => {
            
                        return (                      
                          <tr style={{ textAlign : 'center'}}>
                            <td><GiPartyPopper /> {candidate.first_name} {candidate.last_name}</td>
                            <td>{candidate.designation}</td>
                          </tr>                                            
                        )
                      })}                     
                    </tbody>
                </Table>
                :
                <div className='interview_filler'>
                  <HiOutlineCake className='icon' /><br />
                  <h3>No celebrants for today</h3>
                </div>

              }
            </div>
          
            
            <div className='interview-table'>
              <h5 
                style={{background : '#3b4371', color : '#fff'}} 
                className='table-head'
              >
                New Joinees 
                <span style={{color : '#fff'}} className='muted'> - Last 7 Days</span>
              </h5>
              <Table hover>
              {(joinees?.length > 0) ? 
                <Table hover>
                    <thead>
                      <th><strong>Welcome to  </strong></th>
                    </thead>
                    <tbody>
                      {joinees.map((candidate, i) => {
                        let date = new Date(candidate.joining_date).toString()
            
                        return (                      
                          <tr>
                            <td> <GiGlassCelebration /> {candidate.first_name} {candidate.last_name}</td>
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
                  <h3>No new hires so far</h3>
                </div>

              }
              </Table>
            </div>

          </div>

          <div className='second-metric-container'>
            <h4><MdDateRange className='icon' /> {new Date().toString().slice(0,16)}</h4>
            <ListGroup className='event-list' defaultActiveKey="#link1">
              <ListGroup.Item className='event-head'>
                <BsPeopleFill />  Candidates Summary
              </ListGroup.Item>
              <ListGroup.Item>
                <Badge variant='success'>{candidateCount}</Badge> New Candidates
              </ListGroup.Item>
                <ListGroup.Item>
                <Badge variant='success'>{waiting}</Badge> Waiting For my Action 
              </ListGroup.Item>
            </ListGroup>

            <ListGroup className='event-list' defaultActiveKey="#link1">
              <ListGroup.Item className='event-head'>
                <IoMdPersonAdd />  Notifications
              </ListGroup.Item>
              <ListGroup.Item>
               <Badge 
                variant={(unread === 0) ? 'success' : 'danger'}
              >
                {unread}
              </Badge> 
                Unread Messages
              </ListGroup.Item>
            </ListGroup>
            
          </div>
        </>
        :
        <>
          <div className='first-metric-container'>
            <div className='interview-table'>
              <h5 className='table-head'>Workplace @ <span className='title'>{company?.company_name}</span></h5>
              <Table >
                 {(joinees?.length > 0) ? 
                    <>
                      <thead>
                        <th><strong>Welcome to  </strong></th>
                      </thead>
                      <tbody>
                        {joinees.map((candidate, i) => {
                          let date = new Date(candidate.joining_date).toString()
              
                          return (                      
                            <tr>
                              <td> <GiGlassCelebration /> {candidate.first_name} {candidate.last_name}</td>
                              <td>{candidate.official_email}</td>
                              <td>{candidate.designation}</td>
                              <td>{date.slice(0, 16)}</td>
                            </tr>                                            
                          )
                        })}                     
                      </tbody>
                    </>

                    :

                    <div className='interview_filler'>
                      <MdDateRange className='icon' /><br />
                      <h3>No new hires so far</h3>
                    </div>
                  }
              </Table>
            </div>

            <div className='interview-table'>
              <h5 style={{background : '#3b4371', color : '#fff'}} className='table-head'>Celebration Corner</h5>
              {(celebrators.length > 0) ? 
                <Table hover>
                    <thead>
                      <th><strong>Happy Birthday to </strong></th>
                    </thead>
                    <tbody>
                      {celebrators.map((candidate, i) => {
                        let date = new Date(candidate.date_of_birth).toString()
            
                        return (                      
                          <tr>
                            <td><GiPartyPopper /> {candidate.first_name} {candidate.last_name}</td>
                            <td>{candidate.designation}</td>
                            <td>{date.slice(0, 16)}</td>
                          </tr>                                            
                        )
                      })}                     
                    </tbody>
                </Table>
                :
                <div className='interview_filler'>
                  <HiOutlineCake className='icon' /><br />
                  <h3>No celebrants for today</h3>
                </div>

              }
            </div>
          </div>
            

          <div className='second-metric-container'>
            <h4><MdDateRange className='icon' /> {new Date().toString().slice(0,16)}</h4>

            <ListGroup className='event-list' defaultActiveKey="#link1">
              <ListGroup.Item className='event-head'>
                <IoMdPersonAdd />  Notifications
              </ListGroup.Item>
              <ListGroup.Item>
               <Badge 
                variant={(unread === 0) ? 'success' : 'danger'}
              >
                {unread}
              </Badge> 
                Unread Messages
              </ListGroup.Item>
            </ListGroup>
          
            
          </div>
        </>
      }
    </>  
  )
}