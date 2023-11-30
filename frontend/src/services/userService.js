import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email: email, password: password });
}
//user
const getAllUsers = (inputId, currentPage) => {
    return axios.get(`/api/get-all-users?id=${inputId}&page=${currentPage}`);
}

const countStaff = () => {
    return axios.get(`/api/count-staff`);
}

const findUserApi = (key) => {
    return axios.get(`/api/find-user?key=${key}`);
}

const getAllStaffsWorkingApi = (date) => {
    return axios.get(`/api/get-all-staffs-working?date=${date}`);
}

const handleCreateNewUserApi = (data) => {
    return axios.post('/api/post-add-user', data);
}

const handleEditUserApi = (data) => {
    return axios.put('/api/edit-user', data);
}

const handleDeleteUserApi = (inputId, isMenu) => {
    return axios.delete(`/api/delete-user?id=${inputId}&isMenu=${isMenu}`);
}
//product
const getAllProducts = (productPage) => {
    return axios.get(`/api/get-all-products?page=${productPage}`);
}

const handleCreateNewProductApi = (data) => {
    return axios.post('/api/post-add-product', data);
}

const handleCreateNewProExportApi = (data) => {
    return axios.post('/api/post-add-product-export', data);
}

const handleEditProductApi = (data) => {
    return axios.put('/api/edit-product', data);
}

const handleDeleteProductApi = (id, productId,) => {
    return axios.delete(`/api/delete-product?id=${id}&productId=${productId}`);
}

const handleDeleteImportProductApi = (inputId, nowQuantity, idPro) => {
    return axios.delete(`/api/delete-import-product?importId=${inputId}&nowQuantity=${nowQuantity}&productId=${idPro}`);
}

const handleGetBuyProApi = (page) => {
    return axios.get(`/api/get-buy-products?page=${page}`);
}

//Unit
const handleCreateNewUnitApi = (data) => {
    return axios.post('/api/post-add-unit', data);
}

const handleEditUnitApi = (data) => {
    return axios.put('/api/edit-unit', data);
}

const handleDeleteUnitApi = (inputId, inputKey) => {
    return axios.delete(`/api/delete-unit?id=${inputId}&key=${inputKey}`);
}

//service
const getAllServices = (servicePage) => {
    return axios.get(`/api/get-all-services?page=${servicePage}`);
}

const getAllServicesType = (servicePage) => {
    return axios.get(`/api/get-all-services-type?page=${servicePage}`);
}

const handleCreateNewServiceApi = (data) => {
    return axios.post('/api/post-add-service', data);
}

const handleCreateNewServiceTypeApi = (data) => {
    return axios.post('/api/post-add-service-type', data);
}

const handleEditServiceApi = (data) => {
    return axios.put('/api/edit-service', data);
}

const handleEditServiceTypeApi = (data) => {
    return axios.put('/api/edit-service-type', data);
}

const handleDeleteServiceApi = (inputId) => {
    return axios.delete(`/api/delete-service?id=${inputId}`);
}

const handleDeleteServiceTypeApi = (inputId) => {
    return axios.delete(`/api/delete-service-type?id=${inputId}`);
}

const getServiceWithTypeApi = (serviceType) => {
    return axios.get(`/api/service-with-type?type=${serviceType}`);
}

//schedule
const getAllSchedules = (schedulePage) => {
    return axios.get(`/api/get-all-schedules?page=${schedulePage}`);
}

const handleCreateNewScheduleApi = (data) => {
    return axios.post('/api/post-add-schedule', data);
}

const handleEditScheduleApi = (data) => {
    return axios.put('/api/edit-schedule', data);
}

const handleDeleteScheduleApi = (inputId) => {
    return axios.delete(`/api/delete-schedule?id=${inputId}`);
}

//calendar
const getAllCalendar = (calendarPage) => {
    return axios.get(`/api/get-all-calendar?page=${calendarPage}`);
}

const getAllDeadline = (calendarPage) => {
    return axios.get(`/api/get-all-deadline?page=${calendarPage}`);
}

const handleCreateNewCalendarApi = (data) => {
    return axios.post('/api/post-add-calendar', data);
}

const handleEditCalendarApi = (data) => {
    return axios.put('/api/edit-calendar', data);
}

const handleDeleteCalendarApi = (inputId) => {
    return axios.delete(`/api/delete-calendar?id=${inputId}`);
}

//Booking
const getAllBookings = (bookingPage) => {
    return axios.get(`/api/get-all-bookings?page=${bookingPage}`);
}

const getBookingSalary = (startDate, endDate, staffId) => {
    return axios.get(`/api/get-bookings-salary?startDate=${startDate}&endDate=${endDate}&staffId=${staffId}`);
}

const getCallBookingOfDateApi = (date) => {
    return axios.get(`/api/get-call-booking-ofdate?dateBook=${date}`);
}

const handleCreateNewBookingApi = (data) => {
    return axios.post('/api/post-add-booking', data);
}

const handleCreateNewCallBookingApi = (data) => {
    return axios.post('/api/post-call-booking', data);
}

const handleEditBookingApi = (data) => {
    return axios.put('/api/edit-booking', data);
}

const handleEditCallBookingApi = (data) => {
    return axios.put('/api/edit-call-booking', data);
}

const handleDeleteBookingApi = (inputId) => {
    return axios.delete(`/api/delete-booking?id=${inputId}`);
}

const handleDeleteCallBookingApi = (inputId) => {
    return axios.delete(`/api/delete-call-booking?id=${inputId}`);
}

//Tax
const getAllTaxs = (taxPage) => {
    return axios.get(`/api/get-all-taxs?page=${taxPage}`);
}

const getTaxNow = (startDate) => {
    return axios.get(`/api/get-tax-now?startDate=${startDate}`);
}

const handleCreateNewTaxApi = (data) => {
    return axios.post('/api/post-add-tax', data);
}

const handleEditTaxApi = (data) => {
    return axios.put('/api/edit-tax', data);
}

const handleDeleteTaxApi = (inputId) => {
    return axios.delete(`/api/delete-tax?id=${inputId}`);
}

//Salary
const getAllSalary = (salaryPage) => {
    return axios.get(`/api/get-all-salary?page=${salaryPage}`);
}

const handleCreateNewSalaryApi = (data) => {
    return axios.post('/api/post-add-salary', data);
}

const handleEditSalaryApi = (data) => {
    return axios.put('/api/edit-salary', data);
}

const handleDeleteSalaryApi = (inputId) => {
    return axios.delete(`/api/delete-salary?id=${inputId}`);
}

//getAllCode
const handleGetAllcodeApi = (inputType) => {
    return axios.get(`/api/get-allcode?type=${inputType}`);
}

export {
    handleLoginApi, handleGetAllcodeApi, countStaff,
    getAllUsers, findUserApi, handleCreateNewUserApi, handleEditUserApi, handleDeleteUserApi, getAllStaffsWorkingApi,
    getAllProducts, handleCreateNewProductApi, handleEditProductApi, handleDeleteProductApi,
    getAllServices, getServiceWithTypeApi, handleCreateNewServiceTypeApi, handleCreateNewServiceApi, handleEditServiceApi, handleDeleteServiceApi,
    getAllSchedules, handleCreateNewScheduleApi, handleEditScheduleApi, handleDeleteScheduleApi, getCallBookingOfDateApi,
    getAllBookings, getBookingSalary, handleCreateNewBookingApi, handleEditCallBookingApi, handleCreateNewCallBookingApi, handleEditBookingApi, handleDeleteBookingApi,
    getAllTaxs, handleCreateNewTaxApi, handleEditTaxApi, handleDeleteTaxApi, getTaxNow,
    getAllSalary, handleCreateNewSalaryApi, handleEditSalaryApi, handleDeleteSalaryApi,
    handleEditServiceTypeApi, getAllServicesType, handleDeleteServiceTypeApi, handleDeleteCallBookingApi,
    handleCreateNewUnitApi, handleEditUnitApi, handleDeleteUnitApi, handleCreateNewProExportApi,
    handleDeleteImportProductApi, handleGetBuyProApi,
    getAllCalendar, handleCreateNewCalendarApi, handleEditCalendarApi, handleDeleteCalendarApi,
    getAllDeadline
}
