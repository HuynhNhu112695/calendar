import scheduleService from "../services/scheduleService";

let handleGetAllSchedule = async (req, res) => {
    let page = req.query.page;
    let limit = 30;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let schedules = [];

    schedules = await scheduleService.getAllSchedules();
    let totalSchedule = schedules.length;
    let pageCount = Math.ceil(totalSchedule / limit);

    if (endIndex < totalSchedule) {
        schedules.next = {
            page: page + 1,
            limit: limit
        }

    }
    if (startIndex > 0) {
        schedules.prev = {
            page: page - 1,
            limit: limit
        }
    }
    schedules = schedules.slice(startIndex, endIndex);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        schedules: schedules,
        currentPage: page,
        pageCount: pageCount,
        startIndex: startIndex
    })
}

let handleAddNewSchedule = async (request, res) => {
    let data = request.body
    if (!data.staffId || !data.date) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing inputs parameter!"
        })
    }
    let message = await scheduleService.addNewSchedule(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleEditSchedule = async (req, res) => {
    let data = req.body;
    if (!data.id || !data.staffId || !data.date) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    let message = await scheduleService.editSchedule(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    });
}

let handleDeleteSchedule = async (req, res) => {
    let scheduleId = req.query.id;

    if (!scheduleId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    if (scheduleId) {
        let message = await scheduleService.deleteSchedule(scheduleId);
        return res.status(200).json({
            errCode: message.errCode,
            errMessage: message.errMessage
        });
    }
}

module.exports = {
    handleGetAllSchedule: handleGetAllSchedule,
    handleAddNewSchedule: handleAddNewSchedule,
    handleEditSchedule: handleEditSchedule,
    handleDeleteSchedule: handleDeleteSchedule
}