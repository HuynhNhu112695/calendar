import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingThemes: false,
    serviceAdd: null,
    services: [],
    themes: [],
    servicesWithType: [],
    serviceType: []
}

const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SERVICE_THEME_START:
            state.isLoadingThemes = true;
            return {
                ...state
            }
        case actionTypes.FETCH_SERVICE_THEME_SUCCESS:
            state.themes = action.data;
            state.isLoadingThemes = false;
            return {
                ...state
            }
        case actionTypes.FETCH_SERVICE_THEME_FAILED:
            state.themes = [];
            state.isLoadingThemes = false;
            return {
                ...state
            }
        case actionTypes.CREATE_SERVICE_SUCCESS:
            state.serviceAdd = action.serviceAdd;
            return {
                ...state
            }
        case actionTypes.CREATE_SERVICE_FAILED:
            state.serviceAdd = [];
            return {
                ...state
            }
        case actionTypes.CREATE_SERVICE_TYPE_SUCCESS:
            return {
                ...state
            }
        case actionTypes.CREATE_SERVICE_TYPE_FAILED:
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SERVICES_SUCCESS:
            state.services = action.services;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SERVICES_FAILED:
            state.services = [];
            return {
                ...state
            }
        case actionTypes.FETCH_SERVICES_TYPE_SUCCESS:
            state.serviceType = action.serviceType;
            return {
                ...state
            }
        case actionTypes.FETCH_SERVICES_TYPE_FAILED:
            state.serviceType = [];
            return {
                ...state
            }
        case actionTypes.EDIT_SERVICE_SUCCESS:
            return {
                ...state
            }
        case actionTypes.EDIT_SERVICE_FAILED:
            return {
                ...state
            }
        case actionTypes.EDIT_SERVICE_TYPE_SUCCESS:
            return {
                ...state
            }
        case actionTypes.EDIT_SERVICE_TYPE_FAILED:
            return {
                ...state
            }
        case actionTypes.DELETE_SERVICE_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_SERVICE_FAILED:
            return {
                ...state
            }
        case actionTypes.DELETE_SERVICE_TYPE_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_SERVICE_TYPE_FAILED:
            return {
                ...state
            }
        case actionTypes.SERVICE_WITH_TYPE_SUCCESS:
            state.servicesWithType = action.servicesWithType;
            return {
                ...state
            }
        case actionTypes.SERVICE_WITH_TYPE_FAILED:
            state.servicesWithType = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default serviceReducer;