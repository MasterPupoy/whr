import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Careers from './pages/Careers';
import NotFound from './pages/NotFound'

function App() {
   
  return(
    <Router>
      <Switch>  
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/careers" component={Careers} />
        <Route exact path="/dashboard" render={() => {
          <Dashboard routes={[
              {
                path:'/dashboard/me'
              },
              {
                path:'dashboard/inbox'
              },
              {
                path:'dashboard/recruitment'
              },
              {
                path:'dashboard/employees'
              },
              {
                path:'dashboard/reports'
              },
              {
                path:'dashboard/settings'
              },
            ]}
          />
          }}
        />
        <Route exact path="*" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
