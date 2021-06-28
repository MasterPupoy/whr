import React, { useState, useEffect, useContext, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Metrics from '../components/dashboard/Metrics';
import Inbox from '../components/dashboard/Inbox';
import Employees from '../components/dashboard/Employees';
import Recruitment from '../components/dashboard/Recruitment';
import Reports from '../components/dashboard/Reports';
import Settings from '../components/dashboard/Settings';
import '../css/dashboard.css'


export default function Dashboard(){
  return(
    <div>
    <Router>
      <Topbar company_name='ARDelloson' classes='topbar' />
      <Sidebar classes='sidenav' />
      <div className='main'>
          <Switch>
            <Route path='/dashboard'>
              <Metrics />
            </Route>
            <Route path='/inbox'>
              <Inbox />
            </Route>
            <Route path='/recruitment'>
              <Recruitment />
            </Route>
            <Route path='/employees'>
              <Employees />
            </Route>
            <Route path='/reports'>
              <Reports />
            </Route>
            <Route path='/settings'>
              <Settings />
            </Route>
          </Switch>
      </div>
    </Router>
    </div>
  ) 
}