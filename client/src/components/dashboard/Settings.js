import React, { useEffect,  useState } from 'react';
import { GATEWAY_URL, changePass, version } from '../../helper';
import './css/settings.css';
import male_avatar from '../../static/male_avatar.png';
import female_avatar from '../../static/female_avatar.png';
import fallback from '../../static/profile_pic.png';
import { Button } from 'react-bootstrap';
import whr from '../../static/whr2.png'


export default function Settings(){
  const token = localStorage.getItem('act');
  const [employee, setEmployee] = useState()
  const [company, setCompany] = useState();

  useEffect(() => {
    fetch(`${GATEWAY_URL}/whr/employee/me`, {
        method : 'GET',
        headers : {
          'Authorization' : `${token}`
        },
    }).then(res => res.json()).then(employee => {

      setEmployee(employee)

      fetch(`${GATEWAY_URL}/whr/organization/${employee.company_id}`, {
        method : 'GET',
        headers : {
          'Authorization' : `${token}`
        },
      }).then(res => res.json()).then(company => {

        setCompany(company)
        
      });
    })
  }, [token])

  let bg;

  if(employee?.gender === 'Male'){
    bg = male_avatar
  }else if(employee?.gender === 'Female'){
    bg = female_avatar
  }else {
    bg = fallback
  }


  return(
    <div style={{paddingTop : '60px'}}>
      <div className='brand' >
        <p>Powered by:</p>
        <img src={whr} alt='whr' />
        <p>{version}</p>
      </div>
      <div className='info' >
        <img className='avatar' src={bg} alt='male_avatar' />
        <div className='name'>
          <p>{company?.company_name}</p>
          <p>{company?.industry}</p>
          <p>{employee?.first_name} {employee?.last_name}</p>
        </div>
      </div>
      <div className='smaller'> 
          <p>Position : {employee?.designation}</p>
          <p>Status : {employee?.status}</p>
          <p>Email : {employee?.official_email}</p>
          <p>Joined on : {employee?.joining_date?.toString().slice(0,10)}</p>
          <p>Last login : {employee?.last_login.slice(0,25)}</p>
          <p>Last logout : {employee?.last_logout.slice(0,25)}</p>
      </div>
      <Button 
        className='password_button' 
        variant='warning'
        onClick={() => changePass()}
      >
        Change Password
      </Button>
    </div>
  )
}