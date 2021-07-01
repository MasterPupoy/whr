import React, { useContext } from 'react';
import { Table, ListGroup } from 'react-bootstrap';
import { BsPeopleFill } from 'react-icons/bs';
import { IoMdPersonAdd } from 'react-icons/io';
import { GiAbstract050 } from 'react-icons/gi';
import Title from '../Title';
import './css/metrics.css'; 
import userContext from '../../contexts/userContext';
import companyContext from '../../contexts/companyContext';

export default function Metrics(){
  const elevated = useContext(userContext);
  const company = useContext(companyContext);

  
  return(
    <>
     <Title icon={<GiAbstract050 />} title='My Dashboard' />
     <div className='table-head'>
      <h5>Hey there {elevated?.first_name}!</h5>
      <span className='time'> Your last login was on {elevated?.last_login}</span>
     </div>
      {(elevated?.owner === true) ? 
        <>
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