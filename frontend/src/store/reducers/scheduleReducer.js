import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingThemes: false,
    scheduleAdd: null,
    schedules: [],
    arrStaff: [],
    timeTypes: [],
}

const scheduleReducer = (state = initialState, action) => {
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
        case actionTypes.CREATE_SCHEDULE_SUCCESS:
            state.scheduleAdd = action.scheduleAdd;
            return {
                ...state
            }
        case actionTypes.CREATE_SCHEDULE_FAILED:
            state.scheduleAdd = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SCHEDULES_SUCCESS:
            state.schedules = action.schedules;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SCHEDULES_FAILED:
            state.schedules = [];
            return {
                ...state
            }
        case actionTypes.EDIT_SCHEDULE_SUCCESS:
            return {
                ...state
            }
        case actionTypes.EDIT_SCHEDULE_FAILED:
            return {
                ...state
            }
        case actionTypes.DELETE_SCHEDULE_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_SCHEDULE_FAILED:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default scheduleReducer;