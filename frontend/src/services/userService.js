import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email: email, password: password });
}
//user
const getAllUsers = (inputId, currentPage) => {
    return axios.get(`/api/get-all-users?id=${inputId}&page=${currentPage}`);
}

const findUserApi = (key) => {
    return axios.get(`/api/find-user?key=${key}`);
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

const getAllLate = (calendarPage, userIdCreate) => {
    return axios.get(`/api/get-all-late?page=${calendarPage}&userIdCreate=${userIdCreate}`);
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
    handleLoginApi, handleGetAllcodeApi,
    getAllUsers, findUserApi, handleCreateNewUserApi, handleEditUserApi, handleDeleteUserApi,
    getAllCalendar, handleCreateNewCalendarApi, handleEditCalendarApi, handleDeleteCalendarApi,
    getAllDeadline, getAllLate
}
