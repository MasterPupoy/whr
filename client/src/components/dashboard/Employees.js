import React, { useState, useEffect} from 'react';
import { Spinner, Badge } from 'react-bootstrap';
import Title from '../Title';
import { IoIosPeople } from 'react-icons/io';
import { FaPeopleCarry } from 'react-icons/fa';
import { GATEWAY_URL } from '../../helper';
import './css/employee.css';
import SlideModal from '../SlideModal';
import AddForm from '../AddForm';
import male_avatar from '../../static/male_avatar.png';
import female_avatar from '../../static/female_avatar.png';
import fallback from '../../static/profile_pic.png';
import Compose from '../Compose';
import ViewEmployee from '../ViewEmployee';

export default function Employees(){
  const [employees, setEmployees] = useState([]);
  const [add, setAdd] = useState(false);
  const cid = localStorage.getItem('cid');
  const [compose, setCompose] = useState();
  const [to, setTo] = useState();
  const [show, setShow] = useState(false);
  const [viewEmployee, setViewEmployee] = useState();

  useEffect(() => {

    fetch(`${GATEWAY_URL}/whr/employee/employees`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `${localStorage.getItem('act')}`
      },
      body : JSON.stringify({
        company_id : cid
      })
    }).then(res => res.json()).then(data => setEmployees(data));
  }, [cid, add, show])

  const seeDetails = (employee) => {

    setViewEmployee(employee);

  }

  return(
    <>
      <Title icon={<IoIosPeople />} title='Employees' />
      <SlideModal show={add} modalStyle='add_modal_Style'>
        <AddForm  onClick={() => setAdd(prevState => !prevState)} />
      </SlideModal>
      <SlideModal show={show} modalStyle='add_modal_Style'>
        <ViewEmployee employee={viewEmployee} onClick={() => setShow(prevState => !prevState)} />
      </SlideModal>
      <SlideModal show={compose} modalStyle='recruitment_modal_Style'>
        <Compose 
          recipient={to}
          onClick={() => setCompose(prevState => !prevState)} 
        />
      </SlideModal>
      <div className='employee_container'>
        {(employees) ? 
            <div>
              {(employees.length > 0) ? 
                <div className='employee_inner_container'>
                  {(employees.map((employee, i) => {
        
                    let bg;

                    if(employee.gender === 'Male'){
                      bg = {
                        backgroundImage : `url(${male_avatar})`,
                        backgroundPosition : 'center',
                        backgroundSize : 'cover'
                      }
                    }else if(employee.gender === 'Female'){
                      bg = {
                        backgroundImage : `url(${female_avatar})`,
                        backgroundPosition : 'center',
                        backgroundSize : 'cover'
                      }
                    }else {
                      bg = {
                        backgroundImage : `url(${fallback})`,
                        backgroundPosition : 'center',
                        backgroundSize : 'cover'
                      }
                    }

                    return (
                      <div key={i} className='employee_card'style={bg}>
                        <h4>{employee.first_name} {employee.last_name}</h4>
                        <p><Badge variant='dark' >{employee.designation}</Badge></p>
                        <p><Badge variant='warning'>{(employee.owner) ? 'Sudo' : 'Non-Sudo'}</Badge></p>
                        <p>
                          <Badge variant={(employee.terminated) ? 'danger' : 'success'} >
                            {(employee.terminated) ? 'Terminated' : 'Active'}
                          </Badge>
                        </p>
                        <div className='card_overlay'>
                          <div className='inside_text'>
                            <Badge variant={(employee.terminated) ? 'danger' : 'success'} >
                              {(employee.terminated) ? 'Terminated' : 'Active'}
                            </Badge>
                            <p>{employee.first_name} {employee.last_name}</p>
                            <p>{employee.official_email}</p>
                            <p>{employee.designation}</p>
                              {(employee?.terminated) ? 
                                
                                  <p 
                                    style={{ 
                                      color : '#fff', 
                                      background : '#C70039',
                                      width : '200px',
                                      padding : '10px',
                                      borderRadius : '5px',
                                      fontSize : '12px'
                                    }}
                                  >
                                    Terminated employees will <br />
                                    be removed after 7 days
                                  </p>
                                :
                                  <p>Last login : {employee?.last_login?.slice(0,16)}</p>
                              }
                            <div>
                              {(employee._id === localStorage.getItem('id')) ? 
                                <span>Active</span>
                                :
                                <div>
                                  <button 
                                    className='send_message'
                                    onClick={() => {
                                      setTo(employee._id);
                                      setCompose(prevState => !prevState)
                                    }} 
                                  >
                                    Send a Message</button>
                                  <button 
                                    className='send_message'
                                    onClick={() => {
                                      seeDetails(employee);
                                      setShow(prevState => !prevState)
                                    }}
                                  >
                                    See Details
                                  </button>
                                </div>
                                
                              }
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }))}
                </div>
                : 
                  
                <div style={{
                  textAlign : 'center', 
                  paddingTop : '250px',
                  color : '#bbbb'
                  }}>
                      <FaPeopleCarry className='icon' /><br />
                      <h3>Invite your people aboard!</h3>
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
      </div>
      <button onClick={() => setAdd(prevState => !prevState)} className='add'>+</button>
    </>
  )
}