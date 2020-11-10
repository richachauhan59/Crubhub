import {
    SEARCH_RESULTS_LOADING,
    SEARCH_RESULTS_SUCCESS,
    SEARCH_RESULTS_FAILURE,
    RESTAURANT_DETAILS_LOADING,
    RESTAURANT_DETAILS_SUCCESS,
    RESTAURANT_DETAILS_FAILURE
} from './actionTypes';

const initialState = {
    searchResultsLoading: false,
    searchResultsError: '',
    searchResults: [],
    restaurantDetailsLoading: false,
    restaurantDetailsError: '',
    restaurantDetails: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_RESULTS_LOADING:
            return { ...state, searchResultsLoading: true };
        case SEARCH_RESULTS_FAILURE:
            return {
                ...state,
                searchResultsLoading: false,
                searchResultsError: action.payload
            };
        case SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                searchResultsLoading: false,
                searchResults: action.payload,
                searchResultsError: ''
            };
        case RESTAURANT_DETAILS_LOADING:
            return { ...state, restaurantDetailsLoading: true };
        case RESTAURANT_DETAILS_FAILURE:
            return {
                ...state,
                restaurantDetailsLoading: false,
                restaurantDetailsError: action.payload
            };
        case RESTAURANT_DETAILS_SUCCESS:
            return {
                ...state,
                restaurantDetailsLoading: false,
                restaurantDetails: action.payload,
                restaurantDetailsError: ''
            };
        default:
            return state;
    }
}
