import * as React from 'react';


import { useAuth0 } from "@auth0/auth0-react";

import {
  /* BrowserRouter as Router, */
  /* Switch, */
  Route,
  /* Link, */
  Redirect
} from "react-router-dom";

interface Props {
  path: string
}

export const PrivateRoute: React.FunctionComponent<Props> = ({ children, ...rest }) => {

  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <div>Loading</div>

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute