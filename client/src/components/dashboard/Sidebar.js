import React from 'react';
import { Link } from 'react-router-dom';
import { RiDashboard2Line } from 'react-icons/ri';
import { BsInboxesFill } from 'react-icons/bs';
import { BsBriefcaseFill } from 'react-icons/bs';
import { BsFillPeopleFill } from 'react-icons/bs';
import { BiLineChart } from 'react-icons/bi';
import { RiListSettingsLine } from 'react-icons/ri';

export default function Sidebar({ classes, elevated }){

 return(
  <div className={classes}>
    <div>
      <Link to='/dashboard/me'><RiDashboard2Line /></Link>
      <Link to='/dashboard/inbox'><BsInboxesFill /></Link>
      {(elevated?.owner === true) ? <Link to='/dashboard/recruitment'><BsBriefcaseFill /></Link> : null}
      {(elevated?.owner=== true) ? <Link to='/dashboard/employees'><BsFillPeopleFill /></Link> : null}
      <Link to='/dashboard/reports'><BiLineChart /></Link>
      <Link to='/dashboard/settings'><RiListSettingsLine /></Link>
    </div>
  </div>
 )
};

