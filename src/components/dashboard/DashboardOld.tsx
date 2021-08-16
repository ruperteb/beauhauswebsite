import * as React from 'react';
import { Button } from 'semantic-ui-react'

import { useAuth0 } from "@auth0/auth0-react";

interface Props {

}

export const Dashboard: React.FunctionComponent<Props> = ({ }) => {

    const { logout, user, loginWithRedirect, isAuthenticated } = useAuth0()

   console.log(isAuthenticated)

    return (
        <div className="App">
            {user?.name} Logged In?
            <Button onClick={() => logout({ returnTo: window.location.origin })}></Button>
        </div>
    );
};

export default Dashboard