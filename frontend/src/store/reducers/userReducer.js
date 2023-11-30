import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingRole: false,
    isLoggedIn: false,
    userInfo: null,
    userAdd: null,
    genders: [],
    roles: [],
    staffs: [],
    countStaff: [],
    users: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = [];
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_START:
            state.isLoadingRole = true;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.dataRole;
            state.isLoadingRole = false;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            state.isLoadingRole = false;
            return {
                ...state
            }
        case actionTypes.CREATE_USER_SUCCESS:
            state.userAdd = action.userAdd;
            return {
                ...state
            }
        case actionTypes.CREATE_USER_FAILED:
            state.userAdd = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_STAFFS_WORKING_SUCCESS:
            state.staffs = action.staffs;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_STAFFS_WORKING_FAILED:
            state.staffs = [];
            return {
                ...state
            }
        case actionTypes.EDIT_USER_SUCCESS:
            return {
                ...state
            }
        case actionTypes.EDIT_USER_FAILED:
            return {
                ...state
            }
        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_USER_FAILED:
            return {
                ...state
            }
        case actionTypes.FIND_USER_SUCCESS:
            return {
                ...state
            }
        case actionTypes.FIND_USER_FAILED:
            return {
                ...state
            }
        case actionTypes.COUNT_STAFF_SUCCESS:
            state.countStaff = action.countStaff;
            return {
                ...state
            }
        case actionTypes.COUNT_STAFF_FAILED:
            state.countStaff = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default userReducer;