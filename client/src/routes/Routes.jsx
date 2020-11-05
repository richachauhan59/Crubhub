import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Dashboard from '../components/Dashboard';
import { useSelector } from 'react-redux';

export default function Routes() {
    const { authToken } = useSelector((state) => state.auth);
    return (
        <div>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={(props) => <Home {...props}></Home>}
                ></Route>
                <Route
                    path="/signup"
                    render={() =>
                        authToken === '' ? (
                            <Signup />
                        ) : (
                            <Redirect to="/lets-eat" />
                        )
                    }
                ></Route>
                <Route
                    path="/login"
                    render={() =>
                        authToken === '' ? (
                            <Login />
                        ) : (
                            <Redirect to="/lets-eat" />
                        )
                    }
                ></Route>
                <Route
                    path="/lets-eat"
                    render={() =>
                        authToken !== '' ? (
                            <Dashboard />
                        ) : (
                            <Redirect to="/login" />
                        )
                    }
                ></Route>
            </Switch>
        </div>
    );
}
