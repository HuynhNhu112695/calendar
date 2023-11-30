import db from "../models/index";
const { Op } = require('sequelize');

let getAllSalary = async () => {
    try {
        let salary = await db.Salary.findAll({
            order: [
                ['dateStart', 'DESC']
            ],
            include: [
                {
                    model: db.Users,
                    as: 'staffSalary',
                    attributes: ['firstname', 'lastname']
                }
            ],
            where: {
                action: 1
            },
            raw: true,
            nest: true
        });
        return salary;
    } catch (e) {
        return e;
    }
}

let checkSalary = async (data) => {
    try {
        let salary = await db.Salary.findOne({
            where: {
                staffId: data.staffId,
                dateStart: {
                    [Op.gte]: data.dateStart
                },
                dateEnd: {
                    [Op.lte]: data.dateEnd
                },
                action: 1
            }
        })
        if (salary) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return e;
    }
}

let addNewSalary = async (data) => {
    try {
        let check = await checkSalary(data);
        if (check === true) {
            return ({
                errCode: 1,
                errMessage: "Your data salary is already in use. Please try another salary data!"
            })
        } else {
            await db.Salary.create({
                userIdCreate: data.userIdCreate,
                staffId: data.staffId,
                tax: data.tax,
                cardTotal: data.cardTotal,
                cashTotal: data.cashTotal,
                bonus: data.bonus,
                receivedByCard: data.receivedByCard,
                receivedByCash: data.receivedByCash,
                receivedStore: data.receivedStore,
                receivedStaff: data.receivedStaff,
                receivedAfterTax: data.receivedAfterTax,
                dateStart: data.dateStart,
                dateEnd: data.dateEnd,
                note: data.note,
                action: data.action
            })
            return ({
                errCode: 0,
                errMessage: "Create a new salary succeed!"
            })
        }
    } catch (e) {
        return e;
    }
}

let deleteSalary = async (salaryId) => {
    try {
        let salary = await db.Salary.findOne({
            where: { id: salaryId }
        });
        if (!salary) {
            return ({
                errCode: 1,
                errMessage: "The order isn't exist"
            })
        }

        if (salary) {
            await db.Salary.update({
                action: 0
            },
                {
                    where: { id: salaryId }
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

let editSalary = async (data) => {
    try {
        let salary = await db.Salary.findOne({
            where: { id: data.id, action: 1 }
        })
        if (salary) {
            if (data.dateStart !== salary.dateStart && data.dateEnd !== salary.dateEnd
                && data.staffId !== salar.staffId) {
                let check = await checkSalary(data);
                if (check === true) {
                    return ({
                        errCode: 1,
                        errMessage: "Your order is already in use. Please try another order!"
                    })
                }
            } else {
                await db.Salary.update({
                    staffId: data.staffId,
                    tax: data.tax,
                    cardTotal: data.cardTotal,
                    cashTotal: data.cashTotal,
                    bonus: data.bonus,
                    receivedByCard: data.receivedByCard,
                    receivedByCash: data.receivedByCash,
                    receivedStore: data.receivedStore,
                    receivedStaff: data.receivedStaff,
                    receivedAfterTax: data.receivedAfterTax,
                    dateStart: data.dateStart,
                    dateEnd: data.dateEnd,
                    note: data.note
                },
                    { where: { id: data.id, action: 1 } })
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

module.exports = {
    getAllSalary: getAllSalary,
    addNewSalary: addNewSalary,
    deleteSalary: deleteSalary,
    editSalary: editSalary
}