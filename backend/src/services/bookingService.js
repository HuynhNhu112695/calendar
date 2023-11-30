import db from "../models/index";
const { Op } = require('sequelize');

let getAllBookings = async () => {
    try {
        let bookings = await db.Bookings.findAll({
            order: [
                ['date', 'DESC']
            ],
            include: [
                // {
                //     model: db.Users,
                //     as: 'customerOrder',
                //     attributes: ['firstname', 'lastname']
                // },
                {
                    model: db.Users,
                    as: 'staffOrder',
                    attributes: ['firstname', 'lastname']
                },
                {
                    model: db.Services,
                    as: 'serviceOrder',
                    attributes: ['serviceName']
                },
                {
                    model: db.Allcodes,
                    as: 'themeOrder',
                    attributes: ['valueEn', 'valueVi']
                }
            ],
            where: {
                action: 1
            },
            raw: true,
            nest: true
        });
        return bookings;
    } catch (e) {
        return e;
    }
}

let checkBooking = async (data) => {
    try {
        let booking = await db.Bookings.findOne({
            where: {
                customerId: data.customerId,
                staffId: data.staffId,
                serviceId: data.serviceId,
                date: data.date,
                action: 1
            }
        })
        if (booking) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return e;
    }
}

let addNewBooking = async (data) => {
    try {
        // let check = await checkBooking(data);
        // if (check === true) {
        //     return ({
        //         errCode: 1,
        //         errMessage: "Your data order is already in use. Please try another order data!"
        //     })
        // } else {
        await db.Bookings.create({
            userIdCreate: data.userIdCreate,
            customerName: data.customerName,
            date: data.date,
            staffId: data.staffId,
            themeId: data.themeId,
            serviceId: data.serviceId,
            price: data.price,
            discount: data.discount,
            total: data.total,
            cardPay: data.cardPay,
            cashPay: data.cashPay,
            note: data.note,
            action: data.action
        })
        return ({
            errCode: 0,
            errMessage: "Create a new order succeed!"
        })
        // }
    } catch (e) {
        return e;
    }
}

let addNewCallBooking = async (data) => {
    try {
        await db.CallBookings.create({
            userIdCreate: data.userIdCreate,
            customerName: data.customerName,
            peopleNumber: data.peopleNumber,
            phonenumber: data.phonenumber,
            serviceName: data.serviceName,
            time: data.time,
            date: data.date,
            note: data.note,
        })
        return ({
            errCode: 0,
            errMessage: "Create a new booking succeed!"
        })
    } catch (e) {
        return e;
    }
}

let getCallBookingOfDate = async (date) => {
    try {
        let callbookings = await db.CallBookings.findAll({
            order: [
                ['time', 'DESC']
            ],
            attributes: ['customerName', 'note', 'peopleNumber', 'phonenumber', 'serviceName', "time", "id"],
            where: {
                date: date
            },
            raw: true,
            nest: true
        });
        return callbookings;
    } catch (e) {
        return e;
    }
}

let editCallBooking = async (data) => {
    try {
        let booking = await db.CallBooking.findOne({
            where: { id: data.id }
        })
        if (booking) {
            if (data.staffId !== booking.staffId && data.date !== booking.date
                && data.serviceId !== booking.serviceId
                && data.percentOfStaff !== booking.percentOfStaff
                && data.discount !== booking.discount) {
                let check = await checkBooking(data.bookingName);
                if (check === true) {
                    return ({
                        errCode: 1,
                        errMessage: "Your order is already in use. Please try another order!"
                    })
                }
            } else {
                await db.CallBooking.update({
                    date: data.date,
                    staffId: data.staffId,
                    percentOfStaff: data.percentOfStaff,
                    themeId: data.themeId,
                    serviceId: data.serviceId,
                    price: data.price,
                    discount: data.discount,
                    total: data.total,
                    cardPay: data.cardPay,
                    cashPay: data.cashPay,
                    note: data.note
                },
                    { where: { id: data.id } })
                return ({
                    errCode: 0,
                    errMessage: "Update the order succeed!"
                })
            }
        } else {
            return ({
                errCode: 1,
                errMessage: "The order isn't exist!"
            })
        }
    } catch (e) {
        return e;
    }
}

let deleteBooking = async (bookingId) => {
    try {
        let booking = await db.Bookings.findOne({
            where: { id: bookingId }
        });
        if (!booking) {
            return ({
                errCode: 0,
                errMessage: "The order isn't exist"
            })
        }

        if (booking) {
            await db.Bookings.update({
                action: 0
            }, {
                where: { id: bookingId }
            });
            return ({
                errCode: 0,
                errMessage: "Delete order succeed!"
            })
        }
    } catch (e) {
        return e;
    }
}

let editBooking = async (data) => {
    try {
        let booking = await db.Bookings.findOne({
            where: { id: data.id }
        })
        if (booking) {
            // if (data.staffId !== booking.staffId && data.date !== booking.date
            //     && data.serviceId !== booking.serviceId) {
            // let check = await checkBooking(data.bookingName);
            //     if (check === true) {
            //         return ({
            //             errCode: 1,
            //             errMessage: "Your order is already in use. Please try another order!"
            //         })
            //     }
            // } else {
            await db.Bookings.update({
                date: data.date,
                customerName: data.customerName,
                staffId: data.staffId,
                themeId: data.themeId,
                serviceId: data.serviceId,
                price: data.price,
                discount: data.discount,
                total: data.total,
                cardPay: data.cardPay,
                cashPay: data.cashPay,
                note: data.note
            },
                { where: { id: data.id, action: 1 } })
            return ({
                errCode: 0,
                errMessage: "Update the order succeed!"
            })
            // }
        } else {
            return ({
                errCode: 1,
                errMessage: "The order isn't exist!"
            })
        }
    } catch (e) {
        return e;
    }
}

let getBookingSalary = async (startDate, endDate, staffId) => {
    try {
        let percent = await db.Bookings.findOne({
            include: [
                {
                    model: db.Users,
                    as: 'staffOrder',
                    attributes: ['percentOfStaff']
                }
            ],
            where: {
                action: 1
            },
            raw: true,
            nest: true
        });
        let arrBooking = await db.Bookings.findAll({
            where: {
                date: {
                    [Op.between]: [startDate, endDate]
                },
                staffId: staffId,
                action: 1
            }
        });
        return ({
            arrBooking: arrBooking,
            percent: percent
        })
    } catch (e) {
        return e;
    }
}

let deleteCallBooking = async (bookingId) => {
    try {
        let booking = await db.CallBookings.findOne({
            where: { id: bookingId }
        });
        if (!booking) {
            return ({
                errCode: 1,
                errMessage: "The order isn't exist"
            })
        }

        if (booking) {
            await db.CallBookings.destroy({
                where: { id: bookingId }
            });
            return ({
                errCode: 0,
                errMessage: "Delete call booking succeed!"
            })
        }
    } catch (e) {
        return e;
    }
}

module.exports = {
    getAllBookings: getAllBookings,
    addNewBooking: addNewBooking,
    deleteBooking: deleteBooking,
    editBooking: editBooking,
    getBookingSalary: getBookingSalary,
    addNewCallBooking: addNewCallBooking,
    editCallBooking: editCallBooking,
    getCallBookingOfDate: getCallBookingOfDate,
    deleteCallBooking: deleteCallBooking
}