import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingThemes: false,
    calendarAdd: null,
    calendar: [],
    calendarDead: [],
    calendarLate: [],
    calendarFinished: []
}

const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TIME_TYPE_START:
            state.isLoadingThemes = true;
            return {
                ...state
            }
        case actionTypes.FETCH_TIME_TYPE_SUCCESS:
            state.timeTypes = action.data;
            state.isLoadingThemes = false;
            return {
                ...state
            }
        case actionTypes.FETCH_TIME_TYPE_FAILED:
            state.timeTypes = [];
            state.isLoadingThemes = false;
            return {
                ...state
            }
        case actionTypes.CREATE_CALENDAR_SUCCESS:
            state.calendarAdd = action.calendarAdd;
            return {
                ...state
            }
        case actionTypes.CREATE_CALENDAR_FAILED:
            state.calendarAdd = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CALENDAR_SUCCESS:
            state.calendar = action.calendar;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CALENDAR_FAILED:
            state.calendar = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CALENDAR_DEAD_SUCCESS:
            state.calendarDead = action.calendarDead;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CALENDAR_DEAD_FAILED:
            state.calendarDead = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CALENDAR_LATE_SUCCESS:
            state.calendarLate = action.calendarLate;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CALENDAR_LATE_FAILED:
            state.calendarLate = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CALENDAR_FINISHED_SUCCESS:
            state.calendarFinished = action.calendarFinished;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CALENDAR_FINISHED_FAILED:
            state.calendarFinished = [];
            return {
                ...state
            }
        case actionTypes.EDIT_CALENDAR_SUCCESS:
            return {
                ...state
            }
        case actionTypes.EDIT_CALENDAR_FAILED:
            return {
                ...state
            }
        case actionTypes.DELETE_CALENDAR_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_CALENDAR_FAILED:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default calendarReducer;