import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Registration';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
   
  return(
    <Router>
      <Switch>  
        <Route exact path="/">
          <Login  />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard /> 
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
