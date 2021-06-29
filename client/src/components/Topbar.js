import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { GiAbstract002 } from 'react-icons/gi';
import companyContext from '../contexts/companyContext';
import { getInitials } from '../helper';
import './component_styles/topbar.css'

export default function Topbar(){
  const company = useContext(companyContext);
  console.log(company)

  return (
    <div className='topbar'>
      <GiAbstract002 />
      <span> {company.company_name} Talent Center</span>
      <Button id='logoutButton'>{(company) ? getInitials(company.company_name) : null}</Button>  
    </div>
  );
};