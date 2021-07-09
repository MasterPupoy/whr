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

export default function Employees(){
  const [employees, setEmployees] = useState([]);
  const [add, setAdd] = useState(false);
  const cid = localStorage.getItem('cid');

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
  }, [cid, add])

  return(
    <>
      <Title icon={<IoIosPeople />} title='Employees' />
      <SlideModal show={add} modalStyle='add_modal_Style'>
        <AddForm  onClick={() => setAdd(prevState => !prevState)} />
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
                        <div className='card_overlay'>
                          <div className='inside_text'>
                            <p>{employee.first_name} {employee.last_name}</p>
                            <p>{employee.official_email}</p>
                            <p>{employee.designation}</p>
                            <div>
                              {(employee._id === localStorage.getItem('id')) ? 
                                <span>Active</span>
                                :
                                <button>Send a Message</button>

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