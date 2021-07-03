import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { GiAbstract002 } from 'react-icons/gi';
import companyContext from '../contexts/companyContext';
import userContext from '../contexts/userContext';
import SlideModal from './SlideModal';
import './component_styles/topbar.css'

export default function Topbar({ logout }){
  const company = useContext(companyContext);
  const user = useContext(userContext);
  const [show, setShow] = useState(false);

  const options = () => {
    setShow(prevState => !prevState)
  };

  return (
    <>
      <div className='topbar'>
        <GiAbstract002 />
        <span>{company?.company_name} Talent Center</span>
        <Button id='logoutButton' onClick={options} >{user?.first_name}</Button>
        <SlideModal show={show}>
          <div className='account_container'>
            <span className='account'>{user?.official_email}</span>
            <span className='logout'>Last sign-out {user?.last_logout}</span>
          </div>
          <div className='modal_container'>
            <button className='modal_button'>Account</button>
            <button className='modal_button' onClick={logout}>Sign Out</button>
          </div>
        </SlideModal>
      </div>
      
    </>
  );
};