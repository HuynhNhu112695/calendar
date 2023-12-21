import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
import serviceController from "../controllers/serviceController";
import scheduleController from "../controllers/scheduleController";
import bookingController from "../controllers/bookingController";
import taxController from "../controllers/taxController";
import salaryController from "../controllers/salaryController";
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

    // Unit
    router.post('/api/post-add-unit', productController.handleAddNewUnit);
    router.put('/api/edit-unit', productController.handleEditUnit);
    router.delete('/api/delete-unit', productController.handleDeleteUnit);

    /* Product */
    router.post('/api/post-add-product', productController.handleAddNewProduct);
    router.get('/api/get-all-products', productController.handleGetAllProduct);
    router.put('/api/edit-product', productController.handleEditProduct);
    router.delete('/api/delete-product', productController.handleDeleteProduct);

    router.delete('/api/delete-import-product', productController.handleDeleteImportProduct);
    router.post('/api/post-add-product-export', productController.handleAddNewProExport);

    router.get('/api/get-buy-products', productController.handleGetBuyProduct);

    router.post('/api/post-search-product', productController.handleSearchProduct);
    /* Product Update */
    // router.post('/api/post-add-product-update', productController.handleAddNewProductUpdate);
    // router.get('/api/get-all-update-products', productController.handleGetUpdateProduct);

    /* Service */
    router.post('/api/post-add-service', serviceController.handleAddNewService);
    router.delete('/api/delete-service', serviceController.handleDeleteService);
    router.put('/api/edit-service', serviceController.handleEditService);
    router.get('/api/get-all-services', serviceController.handleGetAllService);
    /* Service Type */
    router.delete('/api/delete-service-type', serviceController.handleDeleteServiceType);
    router.get('/api/get-all-services-type', serviceController.handleGetAllcodesType);
    router.get('/api/service-with-type', serviceController.handleGetAllServiceWithType);
    router.post('/api/post-add-service-type', serviceController.handleAddNewServiceType);
    router.put('/api/edit-service-type', serviceController.handleEditServiceType);

    /* Schedule */
    router.post('/api/post-add-schedule', scheduleController.handleAddNewSchedule);
    router.get('/api/get-all-schedules', scheduleController.handleGetAllSchedule);
    router.put('/api/edit-schedule', scheduleController.handleEditSchedule);
    router.delete('/api/delete-schedule', scheduleController.handleDeleteSchedule);

    /* Calendar */
    router.post('/api/post-add-calendar', calendarController.handleAddNewCalendar);
    router.get('/api/get-all-calendar', calendarController.handleGetAllCalendar);
    router.put('/api/edit-calendar', calendarController.handleEditCalendar);
    router.delete('/api/delete-calendar', calendarController.handleDeleteCalendar);
    router.get('/api/get-all-deadline', calendarController.handleGetAllDeadline);

    /* Booking */
    router.post('/api/post-add-booking', bookingController.handleAddNewBooking);
    router.get('/api/get-all-bookings', bookingController.handleGetAllBooking);
    router.get('/api/get-bookings-salary', bookingController.handleGetBookingSalary);
    router.put('/api/edit-booking', bookingController.handleEditBooking);
    router.delete('/api/delete-booking', bookingController.handleDeleteBooking);

    /* Call Booking */
    router.post('/api/post-call-booking', bookingController.handleAddNewCallBooking);
    router.put('/api/edit-call-booking', bookingController.handleEditCallBooking);
    router.get('/api/get-call-booking-ofdate', bookingController.handleGetCallBookingOfDate);
    router.delete('/api/delete-call-booking', bookingController.handleDeleteCallBooking);

    /* Tax */
    router.post('/api/post-add-tax', taxController.handleAddNewTax);
    router.get('/api/get-all-taxs', taxController.handleGetAllTax);
    router.get('/api/get-tax-now', taxController.handleGetTaxNow);
    router.put('/api/edit-tax', taxController.handleEditTax);
    router.delete('/api/delete-tax', taxController.handleDeleteTax);

    /* Salary */
    router.post('/api/post-add-salary', salaryController.handleAddNewSalary);
    router.get('/api/get-all-salary', salaryController.handleGetAllSalary);
    router.put('/api/edit-salary', salaryController.handleEditSalary);
    router.delete('/api/delete-salary', salaryController.handleDeleteSalary);

    return app.use("/", router);
}

module.exports = initWebRoutes;