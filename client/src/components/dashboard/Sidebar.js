import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RiDashboard2Line } from 'react-icons/ri';
import { BsInboxesFill } from 'react-icons/bs';
import { BsBriefcaseFill } from 'react-icons/bs';
import { BsFillPeopleFill } from 'react-icons/bs';
import { BiLineChart } from 'react-icons/bi';
import { RiListSettingsLine } from 'react-icons/ri';
import userContext from '../../contexts/userContext';

export default function Sidebar({ classes }){
  const elevated = useContext(userContext);


 return(
   <div className={classes}>
    <div>
      <Link to='/dashboard'><RiDashboard2Line /></Link>
      <Link to='/inbox'><BsInboxesFill /></Link>
      {(elevated?.owner === 'true') ? <Link to='/recruitment'><BsBriefcaseFill /></Link> : null}
      {(elevated?.owner === 'true') ? <Link to='/employees'><BsFillPeopleFill /></Link> : null}
      <Link to='/reports'><BiLineChart /></Link>
      <Link to='/settings'><RiListSettingsLine /></Link>
    </div>
    
   </div>
 )
};


