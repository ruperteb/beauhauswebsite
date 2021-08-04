import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import App from "./App"
import Login from "./components/login/Login"
import Dashboard from "./components/dashboard/Dashboard"
import PrivateRoute from "./components/login/PrivateRoute";

export default function AppRouter() {

    const { isAuthenticated } = useAuth0();
    console.log(isAuthenticated)

    return (
        <Router>

            <Switch>
                <PrivateRoute path="/dashboard">
                    <Dashboard></Dashboard>
                </PrivateRoute>
                <Route path="/login">
                    {isAuthenticated ? <Redirect to="/dashboard" /> : <Login></Login>}
                </Route>
                <Route path="/main">
                    <App></App>
                </Route>
                <Route path="/">
                    {/* {isAuthenticated? <Redirect to="/main" /> : <Redirect to="/login" /> } */}
                    <Redirect to="/main" />
                </Route>

            </Switch>

        </Router>
    );
}