import React from 'react'
import { Route, Switch } from "react-router"
import Home from '../components/Home'
import Login from '../components/Login'

export default function Routes() {
    return (
        <div>
            <Switch>
                <Route path="/" exact render={() => <Home></Home>} ></Route>
                <Route path="/login" render={() => <Login></Login>}></Route>
            </Switch>
        </div>
    )
}
