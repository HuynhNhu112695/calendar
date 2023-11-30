import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingThemes: false,
    salaryAdd: null,
    salary: [],
    themes: []
}

const salaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_SALARY_SUCCESS:
            state.salaryAdd = action.salaryAdd;
            return {
                ...state
            }
        case actionTypes.CREATE_SALARY_FAILED:
            state.salaryAdd = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SALARY_SUCCESS:
            state.salary = action.salary;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SALARY_FAILED:
            state.salary = [];
            return {
                ...state
            }
        case actionTypes.EDIT_SALARY_SUCCESS:
            return {
                ...state
            }
        case actionTypes.EDIT_SALARY_FAILED:
            return {
                ...state
            }
        case actionTypes.DELETE_SALARY_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_SALARY_FAILED:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default salaryReducer;