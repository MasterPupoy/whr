import React, { useState, useEffect, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import Title from '../Title';
import { IoIosPeople } from 'react-icons/io';
import { FaPeopleCarry } from 'react-icons/fa';
import { GATEWAY_URL } from '../../helper';
import './css/employee.css';

export default function Employees(){
  const [employees, setEmployees] = useState([]);
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
  }, [employees])

  return(
    <>
      <Title icon={<IoIosPeople />} title='Employees' />
      <div className='employee_container'>
        {(employees) ? 
            <div>
              {(employees.length > 0) ? 
                <div className='employee_inner_container'>
                  {(employees.map((employee, i) => {
                    return (
                      <div key={i} className='employee_card'>
                        <h4>{employee.first_name} {employee.last_name}</h4>
                        <p>{employee.designation}</p>
                        <div className='card_overlay'>
                          <div className='inside_text'>
                            <p>{employee.first_name} {employee.last_name}</p>
                            <p>{employee.designation}</p>
                            <p>{employee.official_email}</p>
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
      <button className='add'>+</button>
    </>
  )
}