import actionTypes from './actionTypes';
import {
    handleGetAllcodeApi, handleCreateNewScheduleApi, getAllSchedules,
    handleDeleteScheduleApi, handleEditScheduleApi,
} from '../../services/userService';
import { toast } from 'react-toastify';

export const fetchTimeTypeStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_TIME_TYPE_START })
            let res = await handleGetAllcodeApi("TIME");
            if (res && res.errCode === 0) {
                dispatch(fetchTimeTypeSuccess(res.data));
            } else {
                dispatch(fetchTimeTypeFailed());
            }
        } catch (e) {
            dispatch(fetchTimeTypeFailed());
            console.log('fetchTimeTypeStart error', e)
        }
    }
}

export const fetchTimeTypeSuccess = (timeTypeData) => ({
    type: actionTypes.FETCH_TIME_TYPE_SUCCESS,
    data: timeTypeData
})

export const fetchTimeTypeFailed = () => ({
    type: actionTypes.FETCH_TIME_TYPE_FAILED
})

export const createNewSchedule = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_SCHEDULE_START })
            let res = await handleCreateNewScheduleApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(createScheduleSuccess());
                dispatch(fetchAllSchedulesStart(data.currentPage));
                dispatch(fetchTimeTypeStart());
            } else {
                toast.error(res.errMessage)
                dispatch(createScheduleFailed());
                dispatch(fetchAllSchedulesStart(data.currentPage));
            }
        } catch (e) {
            dispatch(createScheduleFailed());
            console.log('createNewSchedule error', e)
        }
    }
}

export const createScheduleSuccess = () => ({
    type: actionTypes.CREATE_SCHEDULE_SUCCESS
})

export const createScheduleFailed = () => ({
    type: actionTypes.CREATE_SCHEDULE_FAILED
})

export const fetchAllSchedulesStart = (currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_SCHEDULES_START })
            let res = await getAllSchedules(currentPage);
            if (res && res.errCode === 0) {
                dispatch(fetchAllSchedulesSuccess(res));
            } else {
                toast.error("Fetch all schedules error!")
                dispatch(fetchAllSchedulesFailed());
            }
        } catch (e) {
            dispatch(fetchAllSchedulesFailed());
            console.log('fetchAllSchedulesStart error', e)
        }
    }
}

export const fetchAllSchedulesSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SCHEDULES_SUCCESS,
    schedules: data
})

export const fetchAllSchedulesFailed = () => ({
    type: actionTypes.FETCH_ALL_SCHEDULES_FAILED,
})

export const deleteSchedule = (inputId, currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_SCHEDULE_START })
            let res = await handleDeleteScheduleApi(inputId);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(deleteScheduleSuccess());
                dispatch(fetchAllSchedulesStart(currentPage));
                dispatch(fetchTimeTypeStart());
            } else {
                toast.error(res.errMessage)
                dispatch(deleteScheduleFailed());
            }
        } catch (e) {
            dispatch(createScheduleFailed());
            console.log('deleteNewSchedule error', e)
        }
    }
}

export const deleteScheduleSuccess = (data) => ({
    type: actionTypes.DELETE_SCHEDULE_SUCCESS
})

export const deleteScheduleFailed = () => ({
    type: actionTypes.DELETE_SCHEDULE_FAILED
})

export const editSchedule = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_SCHEDULE_START })
            let res = await handleEditScheduleApi(data)
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editScheduleSuccess());
                dispatch(fetchAllSchedulesStart(data.page));
                dispatch(fetchTimeTypeStart());
            } else {
                toast.error(res.errMessage)
                dispatch(editScheduleFailed());
                dispatch(fetchAllSchedulesStart(data.page));
            }
        } catch (e) {
            dispatch(editScheduleFailed());
            console.log('editSchedule error', e)
        }
    }
}

export const editScheduleSuccess = (data) => ({
    type: actionTypes.EDIT_SCHEDULE_SUCCESS
})

export const editScheduleFailed = () => ({
    type: actionTypes.EDIT_SCHEDULE_FAILED
})