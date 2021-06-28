import React from 'react';
import { Button } from 'react-bootstrap';
import { GiAbstract002 } from 'react-icons/gi';
import { getInitials } from '../helper';

export default function Topbar({ company_name, classes, logo }){
  return (
    <div className={classes}>
      <GiAbstract002 />
      <span> {company_name} Talent Center</span>
      <Button id='logoutButton'>{getInitials(company_name)}</Button>
      
    </div>
  )
}