import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingThemes: false,
    bookingAdd: null,
    bookings: [],
    themes: [],
    bookingSala: [],
    callBooking: []
}

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_BOOKING_SUCCESS:
            state.bookingAdd = action.bookingAdd;
            return {
                ...state
            }
        case actionTypes.CREATE_BOOKING_FAILED:
            state.bookingAdd = [];
            return {
                ...state
            }
        case actionTypes.GET_CALL_BOOKING_OFDATE_SUCCESS:
            state.callBooking = action.dataCall;
            return {
                ...state
            }
        case actionTypes.GET_CALL_BOOKING_OFDATE_FAILED:
            state.callBooking = [];
            return {
                ...state
            }
        case actionTypes.CREATE_CALL_BOOKING_SUCCESS:
            return {
                ...state
            }
        case actionTypes.CREATE_CALL_BOOKING_FAILED:
            return {
                ...state
            }
        case actionTypes.EDIT_CALL_BOOKING_SUCCESS:
            return {
                ...state
            }
        case actionTypes.EDIT_CALL_BOOKING_FAILED:
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_BOOKINGS_SUCCESS:
            state.bookings = action.bookings;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_BOOKINGS_FAILED:
            state.bookings = [];
            return {
                ...state
            }
        case actionTypes.GET_BOOKING_SALARY_SUCCESS:
            state.bookingSala = action.bookingSala;
            return {
                ...state
            }
        case actionTypes.GET_BOOKING_SALARY_FAILED:
            state.bookingSala = [];
            return {
                ...state
            }
        case actionTypes.EDIT_BOOKING_SUCCESS:
            return {
                ...state
            }
        case actionTypes.EDIT_BOOKING_FAILED:
            return {
                ...state
            }
        case actionTypes.DELETE_BOOKING_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_BOOKING_FAILED:
            return {
                ...state
            }
        case actionTypes.DELETE_CALL_BOOKING_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_CALL_BOOKING_FAILED:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default bookingReducer;