import db from "../models/index";

let getAllSchedules = async () => {
    try {
        let schedules = await db.Schedules.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                // { model: db.Allcodes, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Users, as: 'staffInfo', attributes: ['firstname', 'lastname'] }
            ],
            raw: true,
            nest: true
        });
        return schedules;
    } catch (e) {
        return e;
    }
}

let getStaffRest = async (date) => {
    try {
        let staffsRest = await db.Schedules.findAll({
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

let checkSchedule = async (scheduleName) => {
    try {
        let schedule = await db.Schedules.findOne({
            where: {
                staffId: staffId,
                date: date
            }
        })
        if (schedule) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return e;
    }
}

let addNewSchedule = async (data) => {
    try {
        let check = await checkSchedule(data.scheduleName);
        if (check === true) {
            return ({
                errCode: 1,
                errMessage: "Your schedule name is already in use. Please try another schedule name!"
            })
        } else {
            await db.Schedules.create({
                userIdCreate: data.userIdCreate,
                date: data.date,
                // timeType: data.timeType,
                staffId: data.staffId,
                note: data.note,
                action: data.action
            })
            return ({
                errCode: 0,
                errMessage: "Create a new schedule succeed!"
            })
        }
    } catch (e) {
        return e;
    }
}

let deleteSchedule = async (scheduleId) => {
    try {
        let schedule = await db.Schedules.findOne({
            where: { id: scheduleId }
        });
        if (!schedule) {
            return ({
                errCode: 1,
                errMessage: "The schedule isn't exist"
            });
        }

        if (schedule) {
            await db.Schedules.destroy({
                where: { id: scheduleId }
            });
            return ({
                errCode: 0,
                errMessage: "Delete schedule succeed!"
            });
        }
    } catch (e) {
        return e;
    }
}

let editSchedule = async (data) => {
    try {
        let schedule = await db.Schedules.findOne({
            where: { id: data.id }
        })
        if (schedule) {
            if (data.staffId !== schedule.staffId && data.date !== schedule.date) {
                let check = await checkSchedule(data.scheduleName);
                if (check === true) {
                    return ({
                        errCode: 1,
                        errMessage: "Your schedule is already in use. Please try another schedule!"
                    })
                }
            }
            await db.Schedules.update({
                userIdCreate: data.userIdCreate,
                date: data.date,
                // timeType: data.timeType,
                staffId: data.staffId,
                note: data.note
            }, { where: { id: data.id } })
            return ({
                errCode: 0,
                errMessage: "Update the schedule succeed!"
            })
        } else {
            return ({
                errCode: 1,
                errMessage: "The schedule isn't exist!"
            })
        }
    } catch (e) {
        return e;
    }
}

module.exports = {
    getAllSchedules: getAllSchedules,
    addNewSchedule: addNewSchedule,
    deleteSchedule: deleteSchedule,
    editSchedule: editSchedule,
    getStaffRest: getStaffRest
}