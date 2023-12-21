import actionTypes from './actionTypes';
import {
    handleCreateNewCalendarApi, getAllCalendar, getAllDeadline,
    handleDeleteCalendarApi, handleEditCalendarApi,
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

export const fetchAllCalendarStart = (currentPage, userIdCreate) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_CALENDAR_START })
            let res = await getAllCalendar(currentPage, userIdCreate);
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

export const fetchAllDeadlineStart = (currentPage, userIdCreate) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_CALENDAR_DEAD_START })
            let res = await getAllDeadline(currentPage, userIdCreate);
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

export const deleteCalendar = (inputId, currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_CALENDAR_START })
            let res = await handleDeleteCalendarApi(inputId);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(deleteCalendarSuccess());
                dispatch(fetchAllCalendarStart(currentPage));
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
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editCalendarSuccess());
                dispatch(fetchAllCalendarStart(data.currentPage, data.userIdCreate));
                dispatch(fetchAllDeadlineStart(data.currentPage, data.userIdCreate));
            } else {
                toast.error(res.errMessage)
                dispatch(editCalendarFailed());
                dispatch(fetchAllCalendarStart(data.currentPage, data.userIdCreate));
                dispatch(fetchAllDeadlineStart(data.page, data.userIdCreate));
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