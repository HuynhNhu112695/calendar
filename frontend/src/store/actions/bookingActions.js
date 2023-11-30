import actionTypes from './actionTypes';
import {
    handleCreateNewBookingApi, getAllBookings, handleCreateNewCallBookingApi,
    getCallBookingOfDateApi, handleDeleteBookingApi, handleEditBookingApi,
    getBookingSalary, handleEditCallBookingApi, handleDeleteCallBookingApi
} from '../../services/userService';
import { toast } from 'react-toastify';

export const createNewBooking = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_BOOKING_START })
            let count_data = data.length;
            let res = [];
            let current = 1;
            for (let index = 0; index < count_data; index++) {
                res = await handleCreateNewBookingApi({
                    userIdCreate: data[index]["userIdCreate"],
                    customerName: data[index]["customerName"],
                    staffId: data[index]["staffId"],
                    themeId: data[index]["themeId"],
                    serviceId: data[index]["serviceId"],
                    price: data[index]["price"],
                    discount: data[index]["discount"],
                    total: data[index]["total"],
                    cashPay: data[index]["cashPay"],
                    cardPay: data[index]["cardPay"],
                    date: data[index]["date"],
                    note: data[index]["note"],
                    action: 1,
                    currentPage: 1
                });
                if (res && res.errCode === 0) {
                    toast.success(res.errMessage);
                    dispatch(createBookingSuccess());
                    dispatch(fetchAllBookingsStart(current));
                } else {
                    toast.error(res.errMessage);
                    dispatch(createBookingFailed());
                    dispatch(fetchAllBookingsStart(current));
                }
            }
        } catch (e) {
            dispatch(createBookingFailed());
            console.log('createNewBooking error', e)
        }
    }
}

export const createBookingSuccess = () => ({
    type: actionTypes.CREATE_BOOKING_SUCCESS
})

export const createBookingFailed = () => ({
    type: actionTypes.CREATE_BOOKING_FAILED
})

export const createNewCallBooking = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_CALL_BOOKING_START })
            let res = await handleCreateNewCallBookingApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage);
                dispatch(createCallBookingSuccess());
                dispatch(getCallBookingOfDateStart(data.date));
            } else {
                toast.error(res.errMessage);
                dispatch(createCallBookingFailed());
                // dispatch(fetchAllBookingsStart(data.currentPage));
            }
        } catch (e) {
            dispatch(createCallBookingFailed());
            console.log('createNewCallBooking error', e)
        }
    }
}

export const createCallBookingSuccess = () => ({
    type: actionTypes.CREATE_CALL_BOOKING_SUCCESS
})

export const createCallBookingFailed = () => ({
    type: actionTypes.CREATE_CALL_BOOKING_FAILED
})

export const getCallBookingOfDateStart = (date) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_CALL_BOOKING_OFDATE_START })
            let res = await getCallBookingOfDateApi(date);
            if (res && res.errCode === 0) {
                // toast.success(res.errMessage)
                await dispatch(getCallBookingOfDateSuccess(res));
            } else {
                toast.error("Fetch all call booking error!")
                dispatch(getCallBookingOfDateFailed());
            }
        } catch (e) {
            dispatch(getCallBookingOfDateFailed());
            console.log('getCallBookingOfDateStart error', e)
        }
    }
}

export const getCallBookingOfDateSuccess = (data) => ({
    type: actionTypes.GET_CALL_BOOKING_OFDATE_SUCCESS,
    dataCall: data
})

export const getCallBookingOfDateFailed = () => ({
    type: actionTypes.GET_CALL_BOOKING_OFDATE_FAILED,
})

export const editCallBooking = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_CALL_BOOKING_START })
            let res = await handleEditCallBookingApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editCallBookingSuccess());
                // dispatch(fetchAllBookingsStart(data.page));
            } else {
                toast.error(res.errMessage)
                dispatch(editCallBookingFailed());
                // dispatch(fetchAllBookingsStart(data.page));
            }
        } catch (e) {
            dispatch(editCallBookingFailed());
            console.log('editCallBooking error', e)
        }
    }
}

export const editCallBookingSuccess = () => ({
    type: actionTypes.EDIT_CALL_BOOKING_SUCCESS
})

export const editCallBookingFailed = () => ({
    type: actionTypes.EDIT_CALL_BOOKING_FAILED
})

export const fetchAllBookingsStart = (currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_BOOKINGS_START })
            let res = await getAllBookings(currentPage);
            if (res && res.errCode === 0) {
                dispatch(fetchAllBookingsSuccess(res));
            } else {
                toast.error("Fetch all bookings error!");
                dispatch(fetchAllBookingsFailed());
            }
        } catch (e) {
            dispatch(fetchAllBookingsFailed());
            console.log('fetchAllBookingsStart error', e)
        }
    }
}

export const fetchAllBookingsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_BOOKINGS_SUCCESS,
    bookings: data
})

export const fetchAllBookingsFailed = () => ({
    type: actionTypes.FETCH_ALL_BOOKINGS_FAILED,
})

export const deleteBooking = (inputId, currentPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_BOOKING_START })
            let res = await handleDeleteBookingApi(inputId);
            if (res && res.errCode === 0) {
                toast.success("Delete the booking succeed!")
                dispatch(deleteBookingSuccess());
                dispatch(fetchAllBookingsStart(currentPage));
            } else {
                toast.error("Delete the booking error!")
                dispatch(deleteBookingFailed());
            }
        } catch (e) {
            dispatch(createBookingFailed());
            console.log('deleteNewBooking error', e)
        }
    }
}

export const deleteBookingSuccess = (data) => ({
    type: actionTypes.DELETE_BOOKING_SUCCESS
})

export const deleteBookingFailed = () => ({
    type: actionTypes.DELETE_BOOKING_FAILED
})

export const deleteCallBooking = (data, dateBook) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_CALL_BOOKING_START })
            let res = await handleDeleteCallBookingApi(data.id);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(deleteCallBookingSuccess());
                dispatch(getCallBookingOfDateStart(dateBook));
            } else {
                toast.error(res.errMessage)
                dispatch(deleteCallBookingFailed());
            }
        } catch (e) {
            dispatch(createCallBookingFailed());
            console.log('deleteCallBooking error', e)
        }
    }
}

export const deleteCallBookingSuccess = (data) => ({
    type: actionTypes.DELETE_CALL_BOOKING_SUCCESS
})

export const deleteCallBookingFailed = () => ({
    type: actionTypes.DELETE_CALL_BOOKING_FAILED
})

export const editBooking = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_BOOKING_START })
            let res = await handleEditBookingApi(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editBookingSuccess());
                dispatch(fetchAllBookingsStart(data.page));
            } else {
                toast.error(res.errMessage)
                dispatch(editBookingFailed());
                dispatch(fetchAllBookingsStart(data.page));
            }
        } catch (e) {
            dispatch(editBookingFailed());
            console.log('editBooking error', e)
        }
    }
}

export const editBookingSuccess = () => ({
    type: actionTypes.EDIT_BOOKING_SUCCESS
})

export const editBookingFailed = () => ({
    type: actionTypes.EDIT_BOOKING_FAILED
})

export const getBookingSalaryStart = (startDate, endDate, staffId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_BOOKING_SALARY_START })
            let res = await getBookingSalary(startDate, endDate, staffId);
            if (res && res.errCode === 0) {
                dispatch(getBookingSalarySuccess(res));
            } else {
                toast.error("Get booking salary error!");
                dispatch(getBookingSalaryFailed());
            }
        } catch (e) {
            dispatch(getBookingSalaryFailed());
            console.log('getBookingSalaryStart error', e)
        }
    }
}

export const getBookingSalarySuccess = (data) => ({
    type: actionTypes.GET_BOOKING_SALARY_SUCCESS,
    bookingSala: data
})

export const getBookingSalaryFailed = () => ({
    type: actionTypes.GET_BOOKING_SALARY_FAILED,
})
