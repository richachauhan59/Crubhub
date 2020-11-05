import {
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from './actionTypes';

const user = JSON.parse(localStorage.getItem('user')) || {};

const initialState = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    address: user.address || {},
    orders: user.orders || [],
    payments: user.payments || {},
    cart: user.cart || {},
    authToken: user.authToken || '',
    loginloading: false,
    loginError: '',
    registerloading: false,
    registerError: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_LOADING:
            return {
                ...state,
                registerLoading: true
            };
        case REGISTER_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                registerLoading: false,
                registerError: '',
                ...action.payload
            };
        case REGISTER_FAILURE: {
            return {
                ...state,
                registerLoading: false,
                registerError: action.payload
            };
        }
        case LOGIN_LOADING:
            return {
                ...state,
                loginLoading: true
            };
        case LOGIN_SUCCESS: {
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                loginLoading: false,
                loginError: '',
                ...action.payload
            };
        }
        case LOGIN_FAILURE:
            return {
                ...state,
                loginLoading: false,
                loginError: action.payload
            };
        case LOGOUT: {
            //resets localStorage and state
            localStorage.clear();
            return initialState;
        }
        default:
            return state;
    }
};

export default reducer;
