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
    SET_ADDRESS,
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
    registerError: '',
    oauthError: '',
    oauthLoading: false
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
        case OAUTH_LOADING:
            return {
                ...state,
                oauthLoading: true
            };
        case OAUTH_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                oauthLoading: false,
                oauthError: '',
                ...action.payload
            };
        case OAUTH_FAILURE:
            return {
                ...state,
                oauthLoading: false,
                oauthError: action.payload
            };
        case SET_ADDRESS:
            const place = action.payload.place_name.split(', ');
            return {
                ...state,
                address: { place, geometry: action.payload.geometry }
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
