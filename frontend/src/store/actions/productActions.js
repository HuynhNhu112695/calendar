import actionTypes from './actionTypes';
import {
    handleGetAllcodeApi, handleCreateNewProductApi, getAllProducts,
    handleDeleteProductApi, handleEditProductApi, handleEditUnitApi,
    handleCreateNewUnitApi, handleDeleteUnitApi, handleCreateNewProExportApi,
    handleDeleteImportProductApi, handleGetBuyProApi
} from '../../services/userService';
import { toast } from 'react-toastify';

export const fetchUnitStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_UNIT_START })
            let res = await handleGetAllcodeApi("UNIT");
            if (res && res.errCode === 0) {
                dispatch(fetchUnitSuccess(res.data));
            } else {
                dispatch(fetchUnitFailed());
            }
        } catch (e) {
            dispatch(fetchUnitFailed());
            console.log('fetchUnitStart error', e)
        }
    }
}

export const fetchUnitSuccess = (unitData) => ({
    type: actionTypes.FETCH_UNIT_SUCCESS,
    data: unitData
})

export const fetchUnitFailed = () => ({
    type: actionTypes.FETCH_UNIT_FAILED
})

export const fetchBuyProStart = (page) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_BUY_PRO_START })
            let res = await handleGetBuyProApi(page);
            // console.log(res)
            if (res && res.errCode === 0) {
                dispatch(fetchBuyProSuccess(res));
            } else {
                dispatch(fetchBuyProFailed());
            }
        } catch (e) {
            dispatch(fetchBuyProFailed());
            console.log('fetchBuyProStart error', e)
        }
    }
}

export const fetchBuyProSuccess = (buyPro) => ({
    type: actionTypes.FETCH_BUY_PRO_SUCCESS,
    data: buyPro
})

export const fetchBuyProFailed = () => ({
    type: actionTypes.FETCH_BUY_PRO_FAILED
})

export const createNewUnit = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_UNIT_START })
            // console.log(data)
            let res = await handleCreateNewUnitApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(createUnitSuccess());
                dispatch(fetchUnitStart());
            } else {
                toast.error(res.errMessage)
                dispatch(createUnitFailed());
                dispatch(fetchUnitStart());
            }
        } catch (e) {
            dispatch(createUnitFailed());
            console.log('createNewUnit error', e)
        }
    }
}

export const createUnitSuccess = () => ({
    type: actionTypes.CREATE_UNIT_SUCCESS
})

export const createUnitFailed = () => ({
    type: actionTypes.CREATE_UNIT_FAILED
})

export const editUnit = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_UNIT_START })
            let res = await handleEditUnitApi(data)
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editUnitSuccess());
                dispatch(fetchUnitStart());
            } else {
                toast.error(res.errMessage)
                dispatch(editUnitFailed());
                dispatch(fetchUnitStart());
            }
        } catch (e) {
            dispatch(editUnitFailed());
            console.log('editUnit error', e)
        }
    }
}

export const editUnitSuccess = (data) => ({
    type: actionTypes.EDIT_UNIT_SUCCESS
})

export const editUnitFailed = () => ({
    type: actionTypes.EDIT_UNIT_FAILED
})

export const deleteUnit = (data, currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_UNIT_START })
            let res = await handleDeleteUnitApi(data.id, data.key);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(deleteUnitSuccess());
                dispatch(fetchUnitStart());
            } else {
                toast.error(res.errMessage)
                dispatch(deleteUnitFailed());
            }
        } catch (e) {
            dispatch(createUnitFailed());
            console.log('deleteNewUnit error', e)
        }
    }
}

export const deleteUnitSuccess = (data) => ({
    type: actionTypes.DELETE_UNIT_SUCCESS
})

export const deleteUnitFailed = () => ({
    type: actionTypes.DELETE_UNIT_FAILED
})

export const createNewProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_PRODUCT_START })
            // console.log("create pro", data)
            let res = await handleCreateNewProductApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(createProductSuccess());
                dispatch(fetchAllProductsStart(data.currentPage));
                dispatch(fetchUnitStart());
            } else {
                toast.error(res.errMessage)
                dispatch(createProductFailed());
                dispatch(fetchAllProductsStart(data.currentPage));
            }
        } catch (e) {
            dispatch(createProductFailed());
            console.log('createNewProduct error', e)
        }
    }
}

export const createProductSuccess = () => ({
    type: actionTypes.CREATE_PRODUCT_SUCCESS
})

export const createProductFailed = () => ({
    type: actionTypes.CREATE_PRODUCT_FAILED
})

export const createNewProExportStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_PRODUCT_EXPORT_START })
            let res = await handleCreateNewProExportApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(createProExportSuccess());
                dispatch(fetchAllProductsStart(data.currentPage));
                dispatch(fetchUnitStart());
            } else {
                toast.error(res.errMessage)
                dispatch(createProExportFailed());
                dispatch(fetchAllProductsStart(data.currentPage));
            }
        } catch (e) {
            dispatch(createProExportFailed());
            console.log('createNewProduct error', e)
        }
    }
}

export const createProExportSuccess = () => ({
    type: actionTypes.CREATE_PRODUCT_EXPORT_SUCCESS
})

export const createProExportFailed = () => ({
    type: actionTypes.CREATE_PRODUCT_EXPORT_FAILED
})

export const fetchAllProductsStart = (currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_PRODUCTS_START })
            let res = await getAllProducts(currentPage);
            // console.log("pro", res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllProductsSuccess(res));
            } else {
                toast.error("Fetch all Products error!")
                dispatch(fetchAllProductsFailed());
            }
        } catch (e) {
            dispatch(fetchAllProductsFailed());
            console.log('fetchAllProductsStart error', e)
        }
    }
}

export const fetchAllProductsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_PRODUCTS_SUCCESS,
    products: data
})

export const fetchAllProductsFailed = () => ({
    type: actionTypes.FETCH_ALL_PRODUCTS_FAILED,
})

export const deleteProduct = (id, productId, currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_PRODUCT_START })
            let res = await handleDeleteProductApi(id, productId,);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(deleteProductSuccess());
                dispatch(fetchAllProductsStart(currentPage));
                dispatch(fetchUnitStart());
            } else {
                toast.error(res.errMessage)
                dispatch(deleteProductFailed());
            }
        } catch (e) {
            dispatch(deleteProductFailed());
            console.log('deleteProduct error', e)
        }
    }
}

export const deleteProductSuccess = () => ({
    type: actionTypes.DELETE_PRODUCT_SUCCESS
})

export const deleteProductFailed = () => ({
    type: actionTypes.DELETE_PRODUCT_FAILED
})

export const deleteImportProduct = (inputId, currentPage, nowQuantity, idPro) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_IMPORT_PRODUCT_START })
            let res = await handleDeleteImportProductApi(inputId, nowQuantity, idPro);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(deleteImportProductSuccess());
                dispatch(fetchAllProductsStart(currentPage));
                dispatch(fetchUnitStart());
            } else {
                toast.error(res.errMessage)
                dispatch(deleteImportProductFailed());
            }
        } catch (e) {
            dispatch(deleteImportProductFailed());
            console.log('deleteImportProduct error', e)
        }
    }
}

export const deleteImportProductSuccess = () => ({
    type: actionTypes.DELETE_IMPORT_PRODUCT_SUCCESS
})

export const deleteImportProductFailed = () => ({
    type: actionTypes.DELETE_IMPORT_PRODUCT_FAILED
})

export const editProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_PRODUCT_START })
            let res = await handleEditProductApi(data)
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editProductSuccess());
                dispatch(fetchAllProductsStart(data.page));
                dispatch(fetchUnitStart());
            } else {
                toast.error(res.errMessage)
                dispatch(editProductFailed());
                dispatch(fetchAllProductsStart(data.page));
            }
        } catch (e) {
            dispatch(editProductFailed());
            console.log('editProduct error', e)
        }
    }
}

export const editProductSuccess = (data) => ({
    type: actionTypes.EDIT_PRODUCT_SUCCESS
})

export const editProductFailed = () => ({
    type: actionTypes.EDIT_PRODUCT_FAILED
})