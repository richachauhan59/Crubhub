import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default function Routes() {
    return (
        <div>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={(props) => <Home {...props}></Home>}
                ></Route>
                <Route path="/login" render={() => <Login></Login>}></Route>
                <Route path="/signup" render={() => <Signup></Signup>}></Route>
            </Switch>
        </div>
    );
}
