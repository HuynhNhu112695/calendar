import actionTypes from './actionTypes';
import {
    handleGetAllcodeApi, handleCreateNewUserApi, getAllUsers, findUserApi,
    handleDeleteUserApi, handleEditUserApi,
} from '../../services/userService';
import { toast } from 'react-toastify';

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
    userInfo: []
})

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await handleGetAllcodeApi("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchRoleStart = (isMenu) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = '';
            if (isMenu === "USER") {
                res = await handleGetAllcodeApi("ROLE_M");
            } else if (isMenu === "STAFF") {
                res = await handleGetAllcodeApi("ROLE_S");
            } else if (isMenu === "CUSTOMER") {
                res = await handleGetAllcodeApi("ROLE_C");
            }
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error', e)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    dataRole: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_USER_START })
            let res = await handleCreateNewUserApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(createUserSuccess());
                dispatch(fetchAllUsersStart(data.isMenu, data.currentPage));
                dispatch(fetchGenderStart());
                dispatch(fetchRoleStart(data.isMenu));
            } else {
                toast.error(res.errMessage)
                dispatch(createUserFailed());
                dispatch(fetchAllUsersStart(data.isMenu, data.currentPage));
            }
        } catch (e) {
            dispatch(createUserFailed());
            console.log('createNewUser error', e)
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const findUserStart = (key) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FIND_USER_START })
            let res = await findUserApi(key);
            if (res && res.errCode === 0) {
                await dispatch(findUserSuccess(res.listUser));
            } else {
                toast.error("Find users working error!")
                dispatch(findUserFailed());
            }
        } catch (e) {
            dispatch(findUserFailed());
            console.log('findUserStart error', e)
        }
    }
}

export const findUserSuccess = (data) => ({
    type: actionTypes.FIND_USER_SUCCESS,
    listUser: data
})

export const findUserFailed = () => ({
    type: actionTypes.FIND_USER_FAILED,
})

export const deleteUser = (inputId, isMenu, currentPage) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.DELETE_USER_START })
            let res = await handleDeleteUserApi(inputId, isMenu);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart(isMenu, currentPage));
                dispatch(fetchGenderStart());
                dispatch(fetchRoleStart(isMenu));
            } else {
                toast.error(res.errMessage)
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(createUserFailed());
            console.log('deleteNewUser error', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_USER_START })
            let res = await handleEditUserApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart(data.isMenu, data.page));
                dispatch(fetchGenderStart());
                dispatch(fetchRoleStart(data.isMenu));
            } else {
                toast.error(res.errMessage)
                dispatch(editUserFailed());
                dispatch(fetchAllUsersStart(data.isMenu, data.page));
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.log('editUser error', e)
        }
    }
}

export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchAllUsersStart = (isMenu, currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_USERS_START })
            let res = await getAllUsers(isMenu, currentPage);
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res));
            } else {
                toast.error("Fetch all users error!")
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersStart error', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})
