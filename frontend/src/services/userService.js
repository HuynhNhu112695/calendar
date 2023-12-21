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

//calendar
const getAllCalendar = (calendarPage, userIdCreate) => {
    return axios.get(`/api/get-all-calendar?page=${calendarPage}&userIdCreate=${userIdCreate}`);
}

const getAllDeadline = (calendarPage, userIdCreate) => {
    return axios.get(`/api/get-all-deadline?page=${calendarPage}&userIdCreate=${userIdCreate}`);
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

//getAllCode
const handleGetAllcodeApi = (inputType) => {
    return axios.get(`/api/get-allcode?type=${inputType}`);
}

export {
    handleLoginApi, handleGetAllcodeApi, countStaff,
    getAllUsers, findUserApi, handleCreateNewUserApi, handleEditUserApi, handleDeleteUserApi, getAllStaffsWorkingApi,
    getAllCalendar, handleCreateNewCalendarApi, handleEditCalendarApi, handleDeleteCalendarApi,
    getAllDeadline
}
