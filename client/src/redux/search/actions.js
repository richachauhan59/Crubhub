import {
    SEARCH_RESULTS_LOADING,
    SEARCH_RESULTS_SUCCESS,
    SEARCH_RESULTS_FAILURE,
    RESTAURANT_DETAILS_LOADING,
    RESTAURANT_DETAILS_SUCCESS,
    RESTAURANT_DETAILS_FAILURE
} from './actionTypes';
import axios from 'axios';

export const searchResultsLoading = () => ({
    type: SEARCH_RESULTS_LOADING
});

export const searchResultsSuccess = (payload) => ({
    type: SEARCH_RESULTS_SUCCESS,
    payload
});

export const searchResultsFailure = (payload) => ({
    type: SEARCH_RESULTS_FAILURE,
    payload
});

export const getSearchResults = (data) => {
    return (dispatch) => {
        dispatch(searchResultsLoading());
        return axios({
            method: 'POST',
            url: 'http://localhost:5000/api/search',
            data,
            headers: { 'Content-type': 'application/json' }
        })
            .then((res) => dispatch(searchResultsSuccess(res.data)))
            .catch((err) => dispatch(searchResultsFailure(err.response?.data)));
    };
};

export const restaurantDetailsLoading = () => ({
    type: RESTAURANT_DETAILS_LOADING
});

export const restaurantDetailsSuccess = (payload) => ({
    type: RESTAURANT_DETAILS_SUCCESS,
    payload
});

export const restaurantDetailsFailure = (payload) => ({
    type: RESTAURANT_DETAILS_FAILURE,
    payload
});

export const getRestaurantDetails = (data) => {
    return (dispatch) => {
        dispatch(restaurantDetailsLoading());
        return axios({
            url: `http://localhost:5000/api/restaurant/${data}`,
            method: 'GET'
        })
            .then((res) => dispatch(restaurantDetailsSuccess(res.data)))
            .catch((err) =>
                dispatch(restaurantDetailsFailure(err.response?.data))
            );
    };
};
