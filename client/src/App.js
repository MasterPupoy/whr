import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Registration';
import './App.css';

function App() {
  return(
    <Router>
      <Switch>  
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
