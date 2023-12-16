import db from "../models/index";
const { Op } = require('sequelize');

let getAllCalendar = async (userIdCreate) => {
    try {
        let calendar = await db.RepeatCicles.findAll({
            order: [
                ['dataCalendar', 'douutien', 'ASC']
            ],
            include: [
                {
                    model: db.Calendars, as: 'dataCalendar', attributes: ['sovanban',
                        'ngayphathanh', 'chutheyeucau', 'nguoithuchien', 'noidungyeucau',
                        'nhactruoc', 'donviphathanh', 'trichyeunoidung', 'douutien', 'userIdCreate'],
                    where: { userIdCreate: userIdCreate }
                }
            ],
            raw: true,
            nest: true
        });
        return calendar;
    } catch (e) {
        return e;
    }
}

let getStaffRest = async (date) => {
    try {
        let staffsRest = await db.Calendar.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                date: date
            },
            include: [
                { model: db.Users, as: 'staffInfo', attributes: ['id', 'firstname', 'lastname'] }
            ],
            where: {
                action: 1
            },
            raw: true,
            nest: true
        })
        return staffsRest;
    } catch (e) {
        return e;
    }
}

let addNewCalendar = async (data, arrRepeat) => {
    try {
        let addNew = await db.Calendars.create({
            sovanban: data.sovanban,
            ngayphathanh: data.ngayphathanh,
            donviphathanh: data.donviphathanh,
            trichyeunoidung: data.trichyeunoidung,
            chutheyeucau: data.chutheyeucau,
            nguoithuchien: data.nguoithuchien,
            trangthai: data.trangthai,
            noidungyeucau: data.noidungyeucau,
            nhactruoc: data.nhactruoc,
            douutien: data.douutien,
            userIdCreate: data.userIdCreate
        });
        arrRepeat.forEach(async (e) => {
            await db.RepeatCicles.create({
                idcongviec: addNew.id,
                chukylap: e.chukylap,
                ngaylap: e.ngaylap
            });
        });
        return ({
            errCode: 0,
            errMessage: "Create a new work succeed!"
        });
    } catch (e) {
        return e;
    }
}

let deleteCalendar = async (calendarId) => {
    try {
        let calendar = await db.RepeatCicles.findOne({
            where: { id: calendarId }
        });
        if (!calendar) {
            return ({
                errCode: 1,
                errMessage: "The work isn't exist"
            });
        }

        if (calendar) {
            await db.RepeatCicles.destroy({
                where: { id: calendarId }
            });
            return ({
                errCode: 0,
                errMessage: "Delete work succeed!"
            });
        }
    } catch (e) {
        return e;
    }
}

let editCalendar = async (data, arrRepeat) => {
    try {
        let calendar = await db.Calendars.findOne({
            where: { id: data.idcongviec }
        })
        if (calendar) {
            // if (data.dataCalendar.sovanban !== calendar.sovanban &&
            //     data.dataCalendar.noidungyeucau !== calendar.noidungyeucau &&
            //     data.dataCalendar.nguoithuchien !== calendar.nguoithuchien) {
            //     let check = await checkCalendar(data.dataCalendar.sovanban, data.dataCalendar.noidungyeucau, data.dataCalendar.nguoithuchien, data.dataCalendar.noidungyeucau);
            //     if (check === true) {
            //         return ({
            //             errCode: 1,
            //             errMessage: "Your Calendar is already in use. Please try another Calendar!"
            //         })
            //     }
            // }
            await db.Calendars.update({
                sovanban: data.sovanban,
                ngayphathanh: data.ngayphathanh,
                donviphathanh: data.donviphathanh,
                trichyeunoidung: data.trichyeunoidung,
                chutheyeucau: data.chutheyeucau,
                nguoithuchien: data.nguoithuchien,
                trangthai: data.trangthai,
                noidungyeucau: data.noidungyeucau,
                nhactruoc: data.nhactruoc,
                douutien: data.douutien,
            }, { where: { id: data.idcongviec } });
            arrRepeat.forEach(async (e) => {
                await db.RepeatCicles.update({
                    chukylap: e.chukylap,
                    ngaylap: e.ngaylap
                }, { where: { id: data.id } });
            });
            return ({
                errCode: 0,
                errMessage: "Update the calendar succeed!"
            })
        } else {
            return ({
                errCode: 1,
                errMessage: "The work isn't exist!"
            })
        }
    } catch (e) {
        return e;
    }
}

module.exports = {
    getAllCalendar: getAllCalendar,
    // getAllDeadline: getAllDeadline,
    addNewCalendar: addNewCalendar,
    deleteCalendar: deleteCalendar,
    editCalendar: editCalendar,
    getStaffRest: getStaffRest,
}