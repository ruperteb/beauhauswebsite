/* import React from "react"; */
import { useAuth0 } from "@auth0/auth0-react";



const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  if (!isAuthenticated) { loginWithRedirect(/* {
    redirectUri: `${window.location.origin}/dashboard`
  } */) 

}


  return (
    <div>Login</div>
  )
};

export default Login;