import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import calendarController from "../controllers/calendarController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/hello', (req, res) => {
        return res.send("Hello world")
    });

    /* User */
    // router.get('/api/get-add-user', userController.getAddNewUser);
    router.post('/api/post-add-user', userController.handleAddNewUser);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    /*Get all code*/
    router.get('/api/get-allcode', userController.getAllcode);

    /* Calendar */
    router.post('/api/post-add-calendar', calendarController.handleAddNewCalendar);
    router.get('/api/get-all-calendar', calendarController.handleGetAllCalendar);
    router.put('/api/edit-calendar', calendarController.handleEditCalendar);
    router.delete('/api/delete-calendar', calendarController.handleDeleteCalendar);
    router.get('/api/get-all-deadline', calendarController.handleGetAllDeadline);
    router.get('/api/get-deadline-today', calendarController.handleGetDeadlineToday);
    router.get('/api/get-search-deadline', calendarController.handleGetSearchCalendar);
    router.get('/api/get-all-late', calendarController.handleGetAllLate);
    router.get('/api/get-all-finished', calendarController.handleGetAllFinished);

    return app.use("/", router);
}

module.exports = initWebRoutes;