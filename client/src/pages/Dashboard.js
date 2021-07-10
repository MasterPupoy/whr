import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
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
import Sidebar from '../components/dashboard/Sidebar';
import { getValues } from '../helper';

export default function Dashboard(){
  const { path } = useRouteMatch();
  const token = localStorage.getItem('act');
  const [user, setUser] = useState();
  const [company, setCompany] = useState();
  const [loggedIn, setLoggedIn] = useState(true);
  const [redirect, setRedirect] = useState(false);


  useEffect(() => {
    let mounted = true

    if(mounted) {

      fetch(`${GATEWAY_URL}/whr/employee/me`, {
        method : 'GET',
        headers : {
          'Authorization' : `${token}`
        },
      }).then(res => res.json()).then(employee => {
        
        setUser(employee);
        if(!employee.company_id){
          
          if(token){
            getValues(employee._id);
          }
        
          }else{

            fetch(`${GATEWAY_URL}/whr/organization/${employee.company_id}`, {
              method : 'GET',
              headers : {
                'Authorization' : `${token}`
              },
            }).then(res => res.json()).then(company => {

              setCompany(company)
              
            });
          }
      })
    }
    return () => mounted = false
  }, [token])
  
  const logout = () => {
    let date = new Date().toString()
    fetch(`${GATEWAY_URL}/whr/employee/${localStorage.getItem('id')}`, {
      method: 'PUT',
      headers : {
        'Authorization':`${token}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        last_logout : date
      })
    }).then(res => res.json()).then(data => {
 
      if(data){
        localStorage.clear();
        setLoggedIn(false);
        setRedirect(true);
      }
    });

  };

  if(redirect){
    return <Redirect to='/' />
  }

  if(!token){
    return <Login />
  };

  return(
    <div>
    <Router>
      <companyContext.Provider value={company}>
        <userContext.Provider value={user}>
        <Topbar logged={loggedIn} logout={logout} />
        <Sidebar classes='sidenav' elevated={user} />
        <div className='main'>
            <Switch>
              <Route path={`${path}/me`} component={Metrics} />
              <Route path={`${path}/inbox`} component={Inbox} />
              <Route path={`${path}/settings`} component={Settings} />
              <Route path={`${path}/reports`} component={Reports} />
              {(user?.owner === true) ?  <Route path={`${path}/recruitment`} component={Recruitment} /> : null}
              {(user?.owner === true) ? <Route path={`${path}/employees`} component={Employees} /> : null}
            </Switch>
        </div>
        </userContext.Provider>
      </companyContext.Provider>
    </Router>
    </div>
  ) 
}