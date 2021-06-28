import React from 'react';
import { Link } from 'react-router-dom';
import { RiDashboard2Line } from 'react-icons/ri';
import { BsInboxesFill } from 'react-icons/bs';
import { BsBriefcaseFill } from 'react-icons/bs';
import { BsFillPeopleFill } from 'react-icons/bs';
import { BiLineChart } from 'react-icons/bi';
import { RiListSettingsLine } from 'react-icons/ri';


export default function Sidebar({ classes }){
 return(
   <div className={classes}>
    <ul>
      <li><Link to='/dashboard'><RiDashboard2Line /></Link></li>
      <li><Link to='/inbox'><BsInboxesFill /></Link></li>
      <li><Link to='/recruitment'><BsBriefcaseFill /></Link></li>
      <li><Link to='/employees'><BsFillPeopleFill /></Link></li>
      <li><Link to='/reports'><BiLineChart /></Link></li>
      <li><Link to='/settings'><RiListSettingsLine /></Link></li>
    </ul>
    
   </div>
 )
};


