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
const getAllCalendar = (calendarPage, userIdCreate, searchText) => {
    return axios.get(`/api/get-all-calendar?page=${calendarPage}&userIdCreate=${userIdCreate}${searchText ? '&search=' + searchText : ''}`);
}

const getAllDeadline = (calendarPage, userIdCreate, searchText) => {
    return axios.get(`/api/get-all-deadline?page=${calendarPage}&userIdCreate=${userIdCreate}${searchText ? '&search=' + searchText : ''}`);
}

const getDeadlineToday = (calendarPage, userIdCreate, searchText) => {
    return axios.get(`/api/get-deadline-today?page=${calendarPage}&userIdCreate=${userIdCreate}${searchText ? '&search=' + searchText : ''}`);
}

const getAllLate = (calendarPage, userIdCreate, searchText) => {
    return axios.get(`/api/get-all-late?page=${calendarPage}&userIdCreate=${userIdCreate}${searchText ? '&search=' + searchText : ''}`);
}

const getAllFinished = (calendarPage, userIdCreate, searchText) => {
    return axios.get(`/api/get-all-finished?page=${calendarPage}&userIdCreate=${userIdCreate}${searchText ? '&search=' + searchText : ''}`);
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
    getAllDeadline, getAllLate, getAllFinished, getDeadlineToday
}
