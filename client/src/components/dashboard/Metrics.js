import React from 'react';
import { Table, ListGroup } from 'react-bootstrap';
import { GiAbstract050 } from 'react-icons/gi';
import { BsPeopleFill } from 'react-icons/bs';
import { IoMdPersonAdd } from 'react-icons/io';
import './css/metrics.css';

export default function Metrics(){
  return(
    <>
      <div className='heading'><GiAbstract050 /><span className='dashboard-title'>My Dashboard</span></div>
      <div className='first-metric-container'>
        <div className='interview-table'>
          <h5 className='table-head'>Interviews</h5>
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
          <h5 className='table-head'>Referrals</h5>
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
        <button className='add'>+</button>
      </div>
    </>  
  )
}