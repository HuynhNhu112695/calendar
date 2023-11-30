import actionTypes from './actionTypes';
import {
    handleCreateNewTaxApi, getAllTaxs,
    handleDeleteTaxApi, handleEditTaxApi, getTaxNow
} from '../../services/userService';
import { toast } from 'react-toastify';

export const createNewTax = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_TAX_START })
            let res = await handleCreateNewTaxApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage);
                dispatch(createTaxSuccess());
                dispatch(fetchAllTaxsStart(data.currentPage));
            } else {
                toast.error(res.errMessage);
                dispatch(createTaxFailed());
                dispatch(fetchAllTaxsStart(data.currentPage));
            }
        } catch (e) {
            dispatch(createTaxFailed());
            console.log('createNewTax error', e)
        }
    }
}

export const createTaxSuccess = () => ({
    type: actionTypes.CREATE_TAX_SUCCESS
})

export const createTaxFailed = () => ({
    type: actionTypes.CREATE_TAX_FAILED
})

export const fetchAllTaxsStart = (currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_TAXS_START })
            let res = await getAllTaxs(currentPage);
            if (res && res.errCode === 0) {
                dispatch(fetchAllTaxsSuccess(res));
            } else {
                toast.error("Fetch all TAXs error!");
                dispatch(fetchAllTaxsFailed());
            }
        } catch (e) {
            dispatch(fetchAllTaxsFailed());
            console.log('fetchAllTaxsStart error', e)
        }
    }
}

export const fetchAllTaxsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_TAXS_SUCCESS,
    taxs: data
})

export const fetchAllTaxsFailed = () => ({
    type: actionTypes.FETCH_ALL_TAXS_FAILED,
})

export const deleteTax = (inputId, currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_TAX_START })
            let res = await handleDeleteTaxApi(inputId);
            if (res && res.errCode === 0) {
                toast.success("Delete the tax succeed!")
                dispatch(deleteTaxSuccess());
                dispatch(fetchAllTaxsStart(currentPage));
            } else {
                toast.error("Delete the tax error!")
                dispatch(deleteTaxFailed());
            }
        } catch (e) {
            dispatch(createTaxFailed());
            console.log('deleteNewTax error', e)
        }
    }
}

export const deleteTaxSuccess = (data) => ({
    type: actionTypes.DELETE_TAX_SUCCESS
})

export const deleteTaxFailed = () => ({
    type: actionTypes.DELETE_TAX_FAILED
})

export const editTax = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_TAX_START })
            let res = await handleEditTaxApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editTaxSuccess());
                dispatch(fetchAllTaxsStart(data.page));
            } else {
                toast.error(res.errMessage)
                dispatch(editTaxFailed());
                dispatch(fetchAllTaxsStart(data.page));
            }
        } catch (e) {
            dispatch(editTaxFailed());
            console.log('editTax error', e)
        }
    }
}

export const editTaxSuccess = () => ({
    type: actionTypes.EDIT_TAX_SUCCESS
})

export const editTaxFailed = () => ({
    type: actionTypes.EDIT_TAX_FAILED
})

export const getTaxNowStart = (startDate) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_TAX_NOW_START })
            let res = await getTaxNow(startDate);
            if (res && res.errCode === 0) {
                dispatch(getTaxNowSuccess(res.taxNow));
            } else {
                toast.error("Fetch all taxs error!");
                dispatch(getTaxNowFailed());
            }
        } catch (e) {
            dispatch(getTaxNowFailed());
            console.log('fetchAllTaxsStart error', e)
        }
    }
}

export const getTaxNowSuccess = (data) => ({
    type: actionTypes.GET_TAX_NOW_SUCCESS,
    taxNow: data
})

export const getTaxNowFailed = () => ({
    type: actionTypes.GET_TAX_NOW_FAILED,
})
