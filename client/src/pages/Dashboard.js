import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/Topbar';
import Metrics from '../components/dashboard/Metrics';
import Inbox from '../components/dashboard/Inbox';
import Employees from '../components/dashboard/Employees';
import Recruitment from '../components/dashboard/Recruitment';
import Reports from '../components/dashboard/Reports';
import Settings from '../components/dashboard/Settings';
import Login from './Login';
import userContext from '../contexts/userContext';
import companyContext from '../contexts/companyContext';
import '../css/dashboard.css'
import { GATEWAY_URL } from '../helper';


export default function Dashboard(){
  const token = localStorage.getItem('token');
  const [user, setUser] = useState();
  const [company, setCompany] = useState('');
  
  
  useEffect(() => {
    fetch(`${GATEWAY_URL}/whr/employee/me`, {
      method : 'GET',
      headers : {
        'Authorization' : `${localStorage.getItem('token')}`
      },
    }).then(res => res.json()).then(employee => {
      
      setUser(employee)
      console.log(employee)

      fetch(`${GATEWAY_URL}/whr/organization/${employee.company_id}`, {
        method : 'GET',
        headers : {
          'Authorization' : `${localStorage.getItem('token')}`
        },
      }).then(res => res.json()).then(company => setCompany(company));
    });
  }, [])


  if(!token){
    return <Login />
  };

  return(
    <div>
    <Router>
      <companyContext.Provider value={company}>
        <Topbar />
        <userContext.Provider value={user}>
          <Sidebar classes='sidenav' />
        <div className='main'>
            <Switch>
              <Route path='/dashboard'>
                <Metrics />
              </Route>
              <Route path='/inbox'>
                <Inbox />
              </Route>
              <Route path='/settings'>
                <Settings />
              </Route>
              <Route path='/reports'>
                <Reports />
              </Route>
              <Route path='/recruitment'>
                <Recruitment />
              </Route>
              <Route path='/employees'>
                <Employees />
              </Route>
            </Switch>
        </div>
        </userContext.Provider>
      </companyContext.Provider>
    </Router>
    </div>
  ) 
}