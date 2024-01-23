import actionTypes from './actionTypes';
import {
    handleCreateNewCalendarApi, getAllCalendar, getAllDeadline, getDeadlineToday,
    handleDeleteCalendarApi, handleEditCalendarApi, getAllLate, getAllFinished,
    getSearchDeadline
} from '../../services/userService';
import { toast } from 'react-toastify';

export const createNewCalendar = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_CALENDAR_START })
            let res = await handleCreateNewCalendarApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(createCalendarSuccess());
                dispatch(fetchAllCalendarStart(data.currentPage, data.userIdCreate));
            } else {
                toast.error(res.errMessage)
                dispatch(createCalendarFailed());
                dispatch(fetchAllCalendarStart(data.currentPage, data.userIdCreate));
            }
        } catch (e) {
            dispatch(createCalendarFailed());
            console.log('createNewCalendar error', e)
        }
    }
}

export const createCalendarSuccess = () => ({
    type: actionTypes.CREATE_CALENDAR_SUCCESS
})

export const createCalendarFailed = () => ({
    type: actionTypes.CREATE_CALENDAR_FAILED
})

export const fetchAllCalendarStart = (currentPage, userIdCreate, searchText) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_CALENDAR_START })
            let res = await getAllCalendar(currentPage, userIdCreate, searchText);
            if (res && res.errCode === 0) {
                dispatch(fetchAllCalendarSuccess(res));
            } else {
                toast.error("Fetch all Calendar error!")
                dispatch(fetchAllCalendarFailed());
            }
        } catch (e) {
            dispatch(fetchAllCalendarFailed());
            console.log('fetchAllCalendarStart error', e)
        }
    }
}

export const fetchAllCalendarSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CALENDAR_SUCCESS,
    calendar: data
})

export const fetchAllCalendarFailed = () => ({
    type: actionTypes.FETCH_ALL_CALENDAR_FAILED,
})

export const fetchAllDeadlineStart = (currentPage, userIdCreate, searchText) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_CALENDAR_DEAD_START })
            let res = await getAllDeadline(currentPage, userIdCreate, searchText);
            if (res && res.errCode === 0) {
                dispatch(fetchAllDeadlineSuccess(res));
            } else {
                toast.error("Fetch all Calendar error!")
                dispatch(fetchAllDeadlineFailed());
            }
        } catch (e) {
            dispatch(fetchAllDeadlineFailed());
            console.log('fetchAllCalendarStart error', e)
        }
    }
}

export const fetchAllDeadlineSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CALENDAR_DEAD_SUCCESS,
    calendarDead: data
})

export const fetchAllDeadlineFailed = () => ({
    type: actionTypes.FETCH_ALL_CALENDAR_DEAD_FAILED,
})

export const fetchDeadlineTodayStart = (currentPage, userIdCreate, searchText) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_CALENDAR_DEAD_TODAY_START })
            let res = await getDeadlineToday(currentPage, userIdCreate, searchText);
            if (res && res.errCode === 0) {
                dispatch(fetchDeadlineTodaySuccess(res));
            } else {
                toast.error("Fetch all Calendar error!")
                dispatch(fetchDeadlineTodayFailed());
            }
        } catch (e) {
            dispatch(fetchDeadlineTodayFailed());
            console.log('fetchAllCalendarStart error', e)
        }
    }
}

export const fetchDeadlineTodaySuccess = (data) => ({
    type: actionTypes.FETCH_CALENDAR_DEAD_TODAY_SUCCESS,
    calendarDeadToday: data
})

export const fetchDeadlineTodayFailed = () => ({
    type: actionTypes.FETCH_CALENDAR_DEAD_TODAY_FAILED,
})

export const fetchSearchDeadlineStart = (currentPage, userIdCreate, searchText) => {
    return async (dispatch, getState) => {
        try {
            console.log(searchText)
            dispatch({ type: actionTypes.FETCH_CALENDAR_SEARCH_DEAD_START })
            let res = await getSearchDeadline(currentPage, userIdCreate, searchText);
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(fetchSearchDeadlineSuccess(res));
            } else {
                toast.error("Fetch all Calendar error!")
                dispatch(fetchSearchDeadlineFailed());
            }
        } catch (e) {
            dispatch(fetchSearchDeadlineFailed());
            console.log('fetchSearchDeadlineStart error', e)
        }
    }
}

export const fetchSearchDeadlineSuccess = (data) => ({
    type: actionTypes.FETCH_CALENDAR_SEARCH_DEAD_SUCCESS,
    calendar: data
})

export const fetchSearchDeadlineFailed = () => ({
    type: actionTypes.FETCH_CALENDAR_SEARCH_DEAD_FAILED,
})

export const fetchAllLateStart = (currentPage, userIdCreate, searchText) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_CALENDAR_LATE_START })
            let res = await getAllLate(currentPage, userIdCreate, searchText);
            if (res && res.errCode === 0) {
                dispatch(fetchAllLateSuccess(res));
            } else {
                toast.error("Không thể tải lại trang công việc trễ hẹn!")
                dispatch(fetchAllLateFailed());
            }
        } catch (e) {
            dispatch(fetchAllLateFailed());
            console.log('fetchAllLateCalendarStart error', e)
        }
    }
}

export const fetchAllLateSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CALENDAR_LATE_SUCCESS,
    calendarLate: data
})

export const fetchAllLateFailed = () => ({
    type: actionTypes.FETCH_ALL_CALENDAR_LATE_FAILED,
})

// Finished
export const fetchAllFinishedStart = (currentPage, userIdCreate, searchText) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_CALENDAR_FINISHED_START })
            let res = await getAllFinished(currentPage, userIdCreate, searchText);
            if (res && res.errCode === 0) {
                dispatch(fetchAllFinishedSuccess(res));
            } else {
                toast.error("Không thể tải lại trang công việc trễ hẹn!")
                dispatch(fetchAllFinishedFailed());
            }
        } catch (e) {
            dispatch(fetchAllFinishedFailed());
            console.log('fetchAllFinishedCalendarStart error', e)
        }
    }
}

export const fetchAllFinishedSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CALENDAR_FINISHED_SUCCESS,
    calendarFinished: data
})

export const fetchAllFinishedFailed = () => ({
    type: actionTypes.FETCH_ALL_CALENDAR_FINISHED_FAILED,
})

// delete
export const deleteCalendar = (inputId, currentPage, userIdCreate) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_CALENDAR_START })
            let res = await handleDeleteCalendarApi(inputId);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(deleteCalendarSuccess());
                dispatch(fetchAllCalendarStart(currentPage, userIdCreate));
            } else {
                toast.error(res.errMessage)
                dispatch(deleteCalendarFailed());
            }
        } catch (e) {
            dispatch(createCalendarFailed());
            console.log('deleteNewCalendar error', e)
        }
    }
}

export const deleteCalendarSuccess = (data) => ({
    type: actionTypes.DELETE_CALENDAR_SUCCESS
})

export const deleteCalendarFailed = () => ({
    type: actionTypes.DELETE_CALENDAR_FAILED
})

export const editCalendar = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_CALENDAR_START })
            let res = await handleEditCalendarApi(data)
            // console.log("data edit", res)
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editCalendarSuccess());
                dispatch(fetchAllCalendarStart(data.currentPage, data.userIdCreate, ""));
                dispatch(fetchAllDeadlineStart(data.currentPage, data.userIdCreate, ""));
                dispatch(fetchDeadlineTodayStart(data.currentPage, data.userIdCreate, ""));
            } else {
                toast.error(res.errMessage)
                dispatch(editCalendarFailed());
                dispatch(fetchAllCalendarStart(data.currentPage, data.userIdCreate, ""));
                dispatch(fetchAllDeadlineStart(data.page, data.userIdCreate, ""));
                dispatch(fetchDeadlineTodayStart(data.currentPage, data.userIdCreate, ""));
            }
        } catch (e) {
            dispatch(editCalendarFailed());
            console.log('editCalendar error', e)
        }
    }
}

export const editCalendarSuccess = (data) => ({
    type: actionTypes.EDIT_CALENDAR_SUCCESS
})

export const editCalendarFailed = () => ({
    type: actionTypes.EDIT_CALENDAR_FAILED
})