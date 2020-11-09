import {
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    OAUTH_LOADING,
    OAUTH_SUCCESS,
    OAUTH_FAILURE,
    LOGOUT
} from './actionTypes';

import axios from 'axios';

export const registerLoading = () => ({
    type: REGISTER_LOADING
});

export const registerSuccess = (payload) => ({
    type: REGISTER_SUCCESS,
    payload
});

export const registerFailure = (payload) => ({
    type: REGISTER_FAILURE,
    payload
});

export const registerUser = (data) => (dispatch) => {
    dispatch(registerLoading());
    return axios({
        method: 'post',
        url: 'http://localhost:5000/api/register',
        data: data,
        headers: { 'content-type': 'application/json' }
    })
        .then((res) => dispatch(registerSuccess(res.data)))
        .catch((err) => dispatch(registerFailure(err.response.data)));
};

export const loginLoading = () => ({
    type: LOGIN_LOADING
});

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
});

export const loginFailure = (payload) => ({
    type: LOGIN_FAILURE,
    payload
});

export const loginUser = (data) => (dispatch) => {
    dispatch(loginLoading());
    return axios({
        method: 'post',
        url: 'http://localhost:5000/api/login',
        data,
        headers: { 'content-type': 'application/json' }
    })
        .then((res) => dispatch(loginSuccess(res.data)))
        .catch((err) => dispatch(loginFailure(err.response.data)));
};

export const oauthLoading = () => ({
    type: OAUTH_LOADING
});

export const oauthSuccess = (payload) => ({
    type: OAUTH_SUCCESS,
    payload
});

export const oauthFailure = (payload) => ({
    type: OAUTH_FAILURE,
    payload
});

export const oauthLogin = (data) => (dispatch) => {
    dispatch(oauthLoading());
    return axios({
        method: 'post',
        url: 'http://localhost:5000/api/Oauth',
        data,
        headers: { 'content-type': 'application/json' }
    })
        .then((res) => dispatch(oauthSuccess(res.data)))
        .catch((err) => dispatch(oauthFailure(err.response.data)));
};

export const logout = () => ({
    type: LOGOUT,
    logout: 'logout'
});
