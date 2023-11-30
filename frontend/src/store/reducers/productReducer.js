import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingUnit: false,
    productAdd: null,
    products: [],
    units: [],
    buyPro: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_UNIT_START:
            return {
                ...state
            }
        case actionTypes.FETCH_UNIT_SUCCESS:
            state.units = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_UNIT_FAILED:
            state.units = [];
            return {
                ...state
            }
        case actionTypes.FETCH_BUY_PRO_START:
            return {
                ...state
            }
        case actionTypes.FETCH_BUY_PRO_SUCCESS:
            state.buyPro = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_BUY_PRO_FAILED:
            state.buyPro = [];
            return {
                ...state
            }
        case actionTypes.CREATE_PRODUCT_SUCCESS:
            // state.productAdd = action.productAdd;
            return {
                ...state
            }
        case actionTypes.CREATE_PRODUCT_FAILED:
            // state.productAdd = [];
            return {
                ...state
            }
        case actionTypes.CREATE_PRODUCT_EXPORT_SUCCESS:
            return {
                ...state
            }
        case actionTypes.CREATE_PRODUCT_EXPORT_FAILED:
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PRODUCTS_SUCCESS:
            state.products = action.products;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PRODUCTS_FAILED:
            state.products = [];
            return {
                ...state
            }
        case actionTypes.EDIT_PRODUCT_SUCCESS:
            return {
                ...state
            }
        case actionTypes.EDIT_PRODUCT_FAILED:
            return {
                ...state
            }
        case actionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_PRODUCT_FAILED:
            return {
                ...state
            }
        case actionTypes.DELETE_IMPORT_PRODUCT_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_IMPORT_PRODUCT_FAILED:
            return {
                ...state
            }
        case actionTypes.CREATE_UNIT_SUCCESS:
            return {
                ...state
            }
        case actionTypes.CREATE_UNIT_FAILED:
            return {
                ...state
            }
        case actionTypes.EDIT_UNIT_SUCCESS:
            return {
                ...state
            }
        case actionTypes.EDIT_UNIT_FAILED:
            return {
                ...state
            }
        case actionTypes.DELETE_UNIT_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_UNIT_FAILED:
            return {
                ...state
            }
        case actionTypes.DETAIL_UPDATE_PRODUCT_SUCCESS:
            state.productUpdate = action.productUpdate;
            return {
                ...state
            }
        case actionTypes.DETAIL_UPDATE_PRODUCT_FAILED:
            state.productUpdate = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default productReducer;