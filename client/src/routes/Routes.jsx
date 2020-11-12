import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Dashboard from '../components/Dashboard';
import Restaurant from '../components/Restaurant';
import SearchPage from '../components/searchPage/SearchPage';
import PaymentPage from '../components/payment/Payment';

export default function Routes(props) {
    const { authToken } = useSelector((state) => state.auth);
    return (
        <div>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={(props) =>
                        authToken === '' ? (
                            <Home {...props}></Home>
                        ) : (
                            <Redirect to="/lets-eat" />
                        )
                    }
                ></Route>
                <Route
                    path="/signup"
                    render={(props) =>
                        authToken === '' ? (
                            <Signup {...props} />
                        ) : (
                            <Redirect to="/lets-eat" />
                        )
                    }
                ></Route>
                <Route
                    path="/login"
                    render={(props) =>
                        authToken === '' ? (
                            <Login {...props} />
                        ) : (
                            <Redirect to="/lets-eat" />
                        )
                    }
                ></Route>
                <Route
                    path="/lets-eat"
                    render={(props) =>
                        authToken !== '' ? (
                            <Dashboard {...props} />
                        ) : (
                            <Redirect to="/login" />
                        )
                    }
                ></Route>
                <Route
                    path="/restaurant/:id"
                    render={(props) => <Restaurant {...props}></Restaurant>}
                ></Route>
                <Route
                    path="/search"
                    render={(props) => <SearchPage {...props}></SearchPage>}
                ></Route>
                <Route
                    exact
                    path="/checkout"
                    render={(props) => <PaymentPage {...props} />}
                />
                <Route
                    path="*"
                    render={() => <h1>404 Page Not Found</h1>}
                ></Route>
            </Switch>
        </div>
    );
}
