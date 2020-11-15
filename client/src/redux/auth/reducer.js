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
    ADD_TO_CART,
    CLEAR_CART,
    DELETE_ITEM,
    SAVE_ORDER,
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
    cart: user.cart || [],
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
            localStorage.setItem(
                'user',
                JSON.stringify({
                    ...action.payload,
                    ...state,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    authToken: action.payload.authToken
                })
            );
            return {
                ...action.payload,
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                authToken: action.payload.authToken,
                registerLoading: false,
                registerError: ''
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
            localStorage.setItem(
                'user',
                JSON.stringify({
                    ...action.payload,
                    ...state,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    authToken: action.payload.authToken,
                    orders: action.payload.orders
                })
            );
            return {
                ...action.payload,
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                authToken: action.payload.authToken,
                orders: action.payload.orders,
                loginLoading: false,
                loginError: ''
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
            localStorage.setItem(
                'user',
                JSON.stringify({
                    ...action.payload,
                    ...state,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    authToken: action.payload.authToken
                })
            );
            return {
                ...action.payload,
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                authToken: action.payload.authToken,
                oauthLoading: false,
                oauthError: ''
            };
        case OAUTH_FAILURE:
            return {
                ...state,
                oauthLoading: false,
                oauthError: action.payload
            };
        case SET_ADDRESS:
            const place = action.payload.place_name.split(', ');
            localStorage.setItem(
                'user',
                JSON.stringify({
                    ...state,
                    address: { place, geometry: action.payload.geometry }
                })
            );
            return {
                ...state,
                address: { place, geometry: action.payload.geometry }
            };
        case ADD_TO_CART:
            let dupe_item = state.cart.findIndex(
                (item) => item.name === action.payload.name
            );
            if (dupe_item === -1) {
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        ...state,
                        cart: [...state.cart, action.payload]
                    })
                );
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                };
            } else {
                state.cart[dupe_item].quantity += action.payload.quantity;
                state.cart[dupe_item].totalCost += action.payload.totalCost;
                localStorage.setItem('user', JSON.stringify(state));
                return state;
            }
        case CLEAR_CART:
            localStorage.setItem(
                'user',
                JSON.stringify({
                    ...state,
                    cart: []
                })
            );
            return {
                ...state,
                cart: []
            };
        case DELETE_ITEM: {
            let del_item = state.cart.findIndex(
                (item) => item.name === action.payload
            );
            let new_cart = state.cart;
            new_cart.splice(del_item, 1);
            localStorage.setItem(
                'user',
                JSON.stringify({ ...state, cart: new_cart })
            );
            return { ...state, cart: new_cart };
        }
        case SAVE_ORDER: {
            localStorage.setItem(
                'user',
                JSON.stringify({ ...state, orders: action.payload })
            );
            return { ...state, orders: action.payload };
        }
        case LOGOUT: {
            //resets localStorage and state
            localStorage.clear();
            return {
                firstName: '',
                lastName: '',
                email: '',
                address: {},
                orders: [],
                payments: {},
                cart: [],
                authToken: '',
                loginloading: false,
                loginError: '',
                registerloading: false,
                registerError: '',
                oauthError: '',
                oauthLoading: false
            };
        }
        default:
            return state;
    }
};

export default reducer;
