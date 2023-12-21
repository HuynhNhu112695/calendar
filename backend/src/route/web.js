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
    router.get('/api/count-staff', userController.countStaff);
    router.post('/api/post-add-user', userController.handleAddNewUser);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUser);
    router.get('/api/get-all-staffs-working', userController.handleGetAllStaffsWorking);
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

    return app.use("/", router);
}

module.exports = initWebRoutes;