import React from 'react';
import { Button, Row, Col, Tab, Nav, Badge } from 'react-bootstrap';
import { BsPeopleCircle } from 'react-icons/bs';
import { GATEWAY_URL } from '../helper';
import Swal from 'sweetalert2';
import './component_styles/applicantForm.css'

export default function ViewEmployee({ employee, onClick }){


  const fireEmployee = () => {

    Swal.fire({
      icon: 'warning',
      title: `Terminate ${employee.first_name} ?`,
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
       fetch(`${GATEWAY_URL}/whr/employee/${employee._id}`, {
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `${localStorage.getItem('act')}`
        },
        body : JSON.stringify({
          terminated : true
        })
      }).then(res => res.json()).then(data => {
          
          if(data){
            Swal.fire('Employee terminated')

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

  return (
    <div>
      <h3>
        <BsPeopleCircle/> {employee?.first_name} {employee?.last_name}
        {(employee?.owner) ?
            <Badge style={{marginLeft : '50px'}} variant='success'>Admin</Badge> 
          : 
            <Badge style={{marginLeft : '50px'}} variant='info'>Team Member</Badge>
        }
      </h3>
      <div style={{padding : '20px'}}>
        <h5>Position: {employee?.designation}</h5>
        <h5>Type : {employee?.status}</h5>
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
                        <strong>Official Email</strong> : {employee?.official_email}<br />
                        <strong>Phone Number</strong> : {employee?.phone_numbers}<br />
                        <strong>Date Of Birth</strong> : {employee?.date_of_birth}<br />
                        <strong>Gender</strong> : {employee?.gender}<br />

                        
                      </p>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second" >
                    <div className='candidate_info'>
                      <p>
                        <strong>Official Email</strong>  : {employee?.official_email}<br />
                        <strong>Joined On</strong>  : {employee?.joining_date}<br />
                        <strong>Compensation</strong>   : {employee?.compensation}<br />
                        <div style={{textAlign : 'right'}}>
                          {(employee?.terminated) ? 
                            <Button variant='danger' onClick={() => fireEmployee()} disabled>Terminate</Button>
                            :
                            <Button variant='danger' onClick={() => fireEmployee()}>Terminate</Button>
                          }
                          
                        </div>
                      </p>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      
      </div>

      <Button className='set_cancel_button' onClick={onClick}>Close</Button>
    </div>
  )
}