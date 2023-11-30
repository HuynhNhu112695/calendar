import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingThemes: false,
    taxAdd: null,
    taxs: [],
    taxNow: 0
}

const taxReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TAX_SUCCESS:
            state.taxAdd = action.taxAdd;
            return {
                ...state
            }
        case actionTypes.CREATE_TAX_FAILED:
            state.taxAdd = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_TAXS_SUCCESS:
            state.taxs = action.taxs;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_TAXS_FAILED:
            state.taxs = [];
            return {
                ...state
            }
        case actionTypes.EDIT_TAX_SUCCESS:
            return {
                ...state
            }
        case actionTypes.EDIT_TAX_FAILED:
            return {
                ...state
            }
        case actionTypes.GET_TAX_NOW_SUCCESS:
            state.taxNow = action.taxNow;
            return {
                ...state
            }
        case actionTypes.GET_TAX_NOW_FAILED:
            state.taxNow = 0;
            return {
                ...state
            }
        default:
            return state;
    }
}

export default taxReducer;