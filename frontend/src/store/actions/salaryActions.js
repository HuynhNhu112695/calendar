import actionTypes from './actionTypes';
import {
    handleCreateNewSalaryApi, getAllSalary,
    handleDeleteSalaryApi, handleEditSalaryApi
} from '../../services/userService';
import { toast } from 'react-toastify';

export const createNewSalary = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_SALARY_START })
            let res = await handleCreateNewSalaryApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage);
                dispatch(createSalarySuccess());
                dispatch(fetchAllSalaryStart(data.currentPage));
            } else {
                toast.error(res.errMessage);
                dispatch(createSalaryFailed());
                dispatch(fetchAllSalaryStart(data.currentPage));
            }
        } catch (e) {
            dispatch(createSalaryFailed());
            console.log('createNewSalary error', e)
        }
    }
}

export const createSalarySuccess = () => ({
    type: actionTypes.CREATE_SALARY_SUCCESS
})

export const createSalaryFailed = () => ({
    type: actionTypes.CREATE_SALARY_FAILED
})

export const fetchAllSalaryStart = (currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_SALARY_START })
            let res = await getAllSalary(currentPage);
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllSalarySuccess(res));
            } else {
                toast.error("Fetch all salary error!");
                dispatch(fetchAllSalaryFailed());
            }
        } catch (e) {
            dispatch(fetchAllSalaryFailed());
            console.log('fetchAllSalaryStart error', e)
        }
    }
}

export const fetchAllSalarySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SALARY_SUCCESS,
    salary: data
})

export const fetchAllSalaryFailed = () => ({
    type: actionTypes.FETCH_ALL_SALARY_FAILED,
})

export const deleteSalary = (inputId, currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_SALARY_START })
            let res = await handleDeleteSalaryApi(inputId);
            if (res && res.errCode === 0) {
                toast.success("Delete the salary succeed!")
                dispatch(deleteSalarySuccess());
                dispatch(fetchAllSalaryStart(currentPage));
            } else {
                toast.error("Delete the salary error!")
                dispatch(deleteSalaryFailed());
            }
        } catch (e) {
            dispatch(createSalaryFailed());
            console.log('deleteNewSalary error', e)
        }
    }
}

export const deleteSalarySuccess = (data) => ({
    type: actionTypes.DELETE_SALARY_SUCCESS
})

export const deleteSalaryFailed = () => ({
    type: actionTypes.DELETE_SALARY_FAILED
})

export const editSalary = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_SALARY_START })
            let res = await handleEditSalaryApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editSalarySuccess());
                dispatch(fetchAllSalaryStart(data.page));
            } else {
                toast.error(res.errMessage)
                dispatch(editSalaryFailed());
                dispatch(fetchAllSalaryStart(data.page));
            }
        } catch (e) {
            dispatch(editSalaryFailed());
            console.log('editSalary error', e)
        }
    }
}

export const editSalarySuccess = () => ({
    type: actionTypes.EDIT_SALARY_SUCCESS
})

export const editSalaryFailed = () => ({
    type: actionTypes.EDIT_SALARY_FAILED
})
