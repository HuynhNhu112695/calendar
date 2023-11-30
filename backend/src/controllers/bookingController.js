import bookingService from "../services/bookingService";

let handleGetAllBooking = async (req, res) => {
    let page = req.query.page;
    let limit = 30;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let bookings = [];

    bookings = await bookingService.getAllBookings();
    // console.log(bookings)
    let totalBooking = bookings.length;
    let pageCount = Math.ceil(totalBooking / limit);

    if (endIndex < totalBooking) {
        bookings.next = {
            page: page + 1,
            limit: limit
        }

    }
    if (startIndex > 0) {
        bookings.prev = {
            page: page - 1,
            limit: limit
        }
    }
    if (bookings.length !== 0) {
        bookings = bookings.slice(startIndex, endIndex);
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        bookings: bookings,
        currentPage: page,
        pageCount: pageCount,
        startIndex: startIndex
    })
}

let handleAddNewBooking = async (request, res) => {
    let data = request.body;
    // console.log(data)
    // if (!data.staffId1 || !data.date || !data.customerId || !data.serviceId1
    //     || !data.price1 || !data.total) {
    //     return res.status(200).json({
    //         errCode: 1,
    //         errMessage: "Missing inputs parameter!"
    //     })
    // }
    console.log(data)
    let message = await bookingService.addNewBooking(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleGetCallBookingOfDate = async (req, res) => {
    let dateBook = req.query.dateBook;
    let t9 = []; let t11 = []; let t12 = []; let t15 = []; let t17 = [];
    let t10 = []; let t13 = []; let t14 = []; let t16 = []; let t18 = [];
    let obj = {};
    let message = [];
    message = await bookingService.getCallBookingOfDate(dateBook);
    if (message.length !== 0) {
        message.forEach(item => {
            let hour = item.time.slice(0, 2);
            hour = parseInt(hour);
            if (hour >= 9 && hour < 10) {
                obj = item;
                t9.push(obj);
                obj = {};
            }
            if (hour >= 10 && hour < 11) {
                obj = item;
                t10.push(obj);
                obj = {};
            }
            if (hour >= 11 && hour < 12) {
                obj = item;
                t11.push(obj);
                obj = {};
            }
            if (hour >= 12 && hour < 13) {
                obj = item;
                t12.push(obj);
                obj = {};
            }
            if (hour >= 13 && hour < 14) {
                obj = item;
                t13.push(obj);
                obj = {};
            }
            if (hour >= 14 && hour < 15) {
                obj = item;
                t14.push(obj);
                obj = {};
            }
            if (hour >= 15 && hour < 16) {
                obj = item;
                t15.push(obj);
                obj = {};
            }
            if (hour >= 16 && hour < 17) {
                obj = item;
                t16.push(obj);
                obj = {};
            }
            if (hour >= 17 && hour < 18) {
                obj = item;
                t17.push(obj);
                obj = {};
            }
            if (hour >= 18 && hour < 19) {
                obj = item;
                t18.push(obj);
                obj = {};
            }
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: `Load list service booking of the customer on date succeed!`,
        listCallBooking: message,
        dateBook: dateBook,
        t9: t9, t10: t10, t11: t11, t12: t12, t13: t13,
        t14: t14, t15: t15, t16: t16, t17: t17, t18: t18
    })
}

let handleAddNewCallBooking = async (request, res) => {
    let data = request.body;
    if (!data.time || !data.date || !data.customerName || !data.serviceName
        || !data.peopleNumber || !data.phonenumber) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing inputs parameter!"
        })
    }
    let message = await bookingService.addNewCallBooking(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleEditCallBooking = async (req, res) => {
    let data = req.body;
    if (!data.staffId || !data.date || !data.serviceId
        || !data.percentOfStaff || !data.price || !data.total) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    let message = await bookingService.editCallBooking(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    });
}

let handleEditBooking = async (req, res) => {
    let data = req.body;
    // if (!data.staffId || !data.date || !data.serviceId1 || !data.price1 || !data.total) {
    //     return res.status(200).json({
    //         errCode: 1,
    //         errMessage: 'Missing inputs paramater!'
    //     })
    // }
    let message = await bookingService.editBooking(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    });
}

let handleDeleteBooking = async (req, res) => {
    let bookingId = req.query.id;

    if (!bookingId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    if (bookingId) {
        let message = await bookingService.deleteBooking(bookingId);
        return res.status(200).json({
            errCode: message.errCode,
            errMessage: message.errMessage
        });
    }
}

let handleDeleteCallBooking = async (req, res) => {
    let bookingCallId = req.query.id;

    if (!bookingCallId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    if (bookingCallId) {
        let message = await bookingService.deleteCallBooking(bookingCallId);
        return res.status(200).json({
            errCode: message.errCode,
            errMessage: message.errMessage
        });
    }
}

let handleGetBookingSalary = async (req, res) => {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    let staffId = req.query.staffId;
    let totalCardpay = 0;
    let totalCashpay = 0;
    let receivedStaff = 0;
    let arrBooking = [];
    let arrData = await bookingService.getBookingSalary(startDate, endDate, staffId);
    let percentOfStaff = arrData.percent.staffOrder.percentOfStaff;
    arrBooking = arrData.arrBooking;
    arrBooking.forEach(item => {
        if (parseInt(item.cardPay) !== 0) {
            totalCardpay = parseFloat(totalCardpay) + parseFloat(item.cardPay);
            receivedStaff = parseFloat(receivedStaff) + (parseFloat(item.cardPay) * (parseFloat(percentOfStaff) / 100));
        }
        if (parseInt(item.cashPay) !== 0) {
            totalCashpay = parseFloat(totalCashpay) + parseFloat(item.cashPay);
            receivedStaff = parseFloat(receivedStaff) + (parseFloat(item.cashPay * parseFloat(percentOfStaff) / 100));
        }
    })
    let total = parseFloat(totalCardpay) + parseFloat(totalCashpay);
    let receivedStore = parseFloat(total) - parseFloat(receivedStaff);
    return res.status(200).json({
        errCode: 0,
        errMessage: "Ok!",
        total: total,
        percentOfStaff: percentOfStaff,
        arrBooking: arrBooking,
        totalCard: totalCardpay,
        totalCash: totalCashpay,
        receivedStaff: parseFloat(receivedStaff),
        receivedStore: receivedStore
    });
}

module.exports = {
    handleGetAllBooking: handleGetAllBooking,
    handleAddNewBooking: handleAddNewBooking,
    handleEditBooking: handleEditBooking,
    handleDeleteBooking: handleDeleteBooking,
    handleGetBookingSalary: handleGetBookingSalary,
    handleAddNewCallBooking: handleAddNewCallBooking,
    handleEditCallBooking: handleEditCallBooking,
    handleGetCallBookingOfDate: handleGetCallBookingOfDate,
    handleDeleteCallBooking: handleDeleteCallBooking
}