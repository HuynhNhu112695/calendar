import actionTypes from './actionTypes';
import {
    handleGetAllcodeApi, handleCreateNewServiceApi, getAllServices, handleCreateNewServiceTypeApi,
    handleDeleteServiceApi, handleEditServiceApi, getServiceWithTypeApi, handleEditServiceTypeApi,
    getAllServicesType, handleDeleteServiceTypeApi
} from '../../services/userService';
import { toast } from 'react-toastify';

export const fetchThemeStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_SERVICE_THEME_START })
            let res = await handleGetAllcodeApi("SERVICE");
            if (res && res.errCode === 0) {
                dispatch(fetchThemeSuccess(res.data));
            } else {
                dispatch(fetchThemeFailed());
            }
        } catch (e) {
            dispatch(fetchThemeFailed());
            console.log('fetchThemeStart error', e)
        }
    }
}

export const fetchThemeSuccess = (themeData) => ({
    type: actionTypes.FETCH_SERVICE_THEME_SUCCESS,
    data: themeData
})

export const fetchThemeFailed = () => ({
    type: actionTypes.FETCH_SERVICE_THEME_FAILED
})

export const createNewService = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_SERVICE_START })
            let res = await handleCreateNewServiceApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(createServiceSuccess());
                dispatch(fetchAllServicesStart(data.currentPage));
                dispatch(fetchThemeStart());
            } else {
                toast.error(res.errMessage)
                dispatch(createServiceFailed());
                dispatch(fetchAllServicesStart(data.currentPage));
            }
        } catch (e) {
            dispatch(createServiceFailed());
            console.log('createNewService error', e)
        }
    }
}

export const createServiceSuccess = () => ({
    type: actionTypes.CREATE_SERVICE_SUCCESS
})

export const createServiceFailed = () => ({
    type: actionTypes.CREATE_SERVICE_FAILED
})

export const createNewServiceType = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_SERVICE_TYPE_START })
            let res = await handleCreateNewServiceTypeApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(createServiceTypeSuccess());
                dispatch(fetchServicesTypeStart(data.currentPage));
            } else {
                toast.error(res.errMessage)
                dispatch(createServiceTypeFailed());
            }
        } catch (e) {
            dispatch(createServiceFailed());
            console.log('createNewServiceType error', e)
        }
    }
}

export const createServiceTypeSuccess = () => ({
    type: actionTypes.CREATE_SERVICE_TYPE_SUCCESS
})

export const createServiceTypeFailed = () => ({
    type: actionTypes.CREATE_SERVICE_TYPE_FAILED
})

export const deleteService = (inputId, currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_SERVICE_START })
            let res = await handleDeleteServiceApi(inputId);
            if (res && res.errCode === 0) {
                toast.success("Delete the service succeed!")
                dispatch(deleteServiceSuccess());
                dispatch(fetchAllServicesStart(currentPage));
                dispatch(fetchThemeStart());
            } else {
                toast.error("Delete the service error!")
                dispatch(deleteServiceFailed());
            }
        } catch (e) {
            dispatch(createServiceFailed());
            console.log('deleteNewService error', e)
        }
    }
}

export const deleteServiceSuccess = (data) => ({
    type: actionTypes.DELETE_SERVICE_SUCCESS
})

export const deleteServiceFailed = () => ({
    type: actionTypes.DELETE_SERVICE_FAILED
})

export const deleteServiceType = (inputId, currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_SERVICE_TYPE_START })
            console.log(currentPage)
            let res = await handleDeleteServiceTypeApi(inputId);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(deleteServiceTypeSuccess());
                dispatch(fetchServicesTypeStart(currentPage));
            } else {
                toast.error(res.errMessage)
                dispatch(deleteServiceTypeFailed());
            }
        } catch (e) {
            dispatch(createServiceTypeFailed());
            console.log('deleteNewServiceType error', e)
        }
    }
}

export const deleteServiceTypeSuccess = (data) => ({
    type: actionTypes.DELETE_SERVICE_TYPE_SUCCESS
})

export const deleteServiceTypeFailed = () => ({
    type: actionTypes.DELETE_SERVICE_TYPE_FAILED
})

export const editServiceType = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_SERVICE_TYPE_START })
            let res = await handleEditServiceTypeApi(data)
            console.log(data)
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editServiceTypeSuccess());
                dispatch(fetchServicesTypeStart(data.page));
            } else {
                toast.error(res.errMessage)
                dispatch(editServiceTypeFailed());
                dispatch(fetchServicesTypeStart(data.page));
            }
        } catch (e) {
            dispatch(editServiceTypeFailed());
            console.log('editService error', e)
        }
    }
}

export const editServiceTypeSuccess = () => ({
    type: actionTypes.EDIT_SERVICE_TYPE_SUCCESS
})

export const editServiceTypeFailed = () => ({
    type: actionTypes.EDIT_SERVICE_TYPE_FAILED
})

export const editService = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_SERVICE_START })
            let res = await handleEditServiceApi(data)
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editServiceSuccess());
                dispatch(fetchAllServicesStart(data.page));
                dispatch(fetchThemeStart());
            } else {
                toast.error(res.errMessage)
                dispatch(editServiceFailed());
                dispatch(fetchAllServicesStart(data.page));
            }
        } catch (e) {
            dispatch(editServiceFailed());
            console.log('editService error', e)
        }
    }
}

export const editServiceSuccess = () => ({
    type: actionTypes.EDIT_SERVICE_SUCCESS
})

export const editServiceFailed = () => ({
    type: actionTypes.EDIT_SERVICE_FAILED
})

export const getServiceWithType = (serviceType) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.SERVICE_WITH_TYPE_START })
            let res = await getServiceWithTypeApi(serviceType);
            if (res && res.errCode === 0) {
                dispatch(getServiceWithTypeSuccess(res.serviceWithType));
            } else {
                toast.error("Fetch all services with type error!")
                dispatch(getServiceWithTypeFailed());
            }
        } catch (e) {
            dispatch(getServiceWithTypeFailed());
            console.log('serviceWithType error', e)
        }
    }
}

export const getServiceWithTypeSuccess = (data) => ({
    type: actionTypes.SERVICE_WITH_TYPE_SUCCESS,
    servicesWithType: data
})

export const getServiceWithTypeFailed = () => ({
    type: actionTypes.SERVICE_WITH_TYPE_FAILED,
})

export const fetchAllServicesStart = (currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_SERVICES_START })
            let res = await getAllServices(currentPage);
            if (res && res.errCode === 0) {
                dispatch(fetchAllServicesSuccess(res));
            } else {
                toast.error("Fetch all services error!")
                dispatch(fetchAllServicesFailed());
            }
        } catch (e) {
            dispatch(fetchAllServicesFailed());
            console.log('fetchAllServicesStart error', e)
        }
    }
}

export const fetchAllServicesSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SERVICES_SUCCESS,
    services: data
})

export const fetchAllServicesFailed = () => ({
    type: actionTypes.FETCH_ALL_SERVICES_FAILED,
})

export const fetchServicesTypeStart = (currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_SERVICES_TYPE_START })
            let res = await getAllServicesType(currentPage);
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(fetchServicesTypeSuccess(res));
            } else {
                toast.error("Fetch all services type error!")
                dispatch(fetchServicesTypeFailed());
            }
        } catch (e) {
            dispatch(fetchServicesTypeFailed());
            console.log('fetchServicesTypeStart error', e)
        }
    }
}

export const fetchServicesTypeSuccess = (data) => ({
    type: actionTypes.FETCH_SERVICES_TYPE_SUCCESS,
    serviceType: data
})

export const fetchServicesTypeFailed = () => ({
    type: actionTypes.FETCH_SERVICES_TYPE_FAILED,
})