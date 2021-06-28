import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router';

export default function PrivateRoute({ children, ...rest}){
  let auth = useContext()

  return ( 
    <Route 
      {...rest}
      render={({ location }) => 
        auth.user ? (
          children
        ) : (
          <Redirect
            to = {{
              pathname: '/dashboard',
              state: { from: location}
            }}
          />
        )
      }
    />
  );
}