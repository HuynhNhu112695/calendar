import db from "../models/index";
const { Op } = require('sequelize');

let getAllCalendar = async (userIdCreate) => {
    try {
        let calendar = await db.RepeatCicles.findAll({
            order: [
                ['createdAt', 'DESC']
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

let addNewCalendar = async (data) => {
    try {
        let arrNN = data.arrNgayNhac;
        let addNew = await db.Calendars.create({
            sovanban: data.sovanban,
            ngayphathanh: data.ngayphathanh,
            donviphathanh: data.donviphathanh,
            trichyeunoidung: data.trichyeunoidung,
            chutheyeucau: data.chutheyeucau,
            nguoithuchien: data.nguoithuchien,
            noidungyeucau: data.noidungyeucau,
            nhactruoc: data.nhactruoc,
            douutien: data.douutien,
            userIdCreate: data.userIdCreate
        });
        arrNN.forEach(async (e) => {
            await db.RepeatCicles.create({
                idcongviec: addNew.id,
                chukylap: e.chukylap,
                ngaylap: e.ngaynhac,
                tieude: e.tieude,
                trangthai: data.trangthai,
            });
        });
        return ({
            errCode: 0,
            errMessage: "Tạo nhắc việc mới thành công!"
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
                errMessage: "Nhắc việc này không tồn tại!"
            });
        }

        if (calendar) {
            await db.RepeatCicles.destroy({
                where: { id: calendarId }
            });
            return ({
                errCode: 0,
                errMessage: "Xóa nhắc việc thành công!"
            });
        }
    } catch (e) {
        return e;
    }
}

let editCalendar = async (data) => {
    try {
        let calendar = await db.Calendars.findOne({
            where: { id: data.idcongviec }
        })
        if (calendar) {
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
                updatedAt: data.updatedAt
            }, { where: { id: data.idcongviec } });
            // arrRepeat.forEach(async (e) => {
            await db.RepeatCicles.update({
                ngaylap: data.ngaylap,
                trangthai: data.trangthai,
                updatedAt: data.updatedAt
            }, { where: { id: data.id } });
            // });
            return ({
                errCode: 0,
                errMessage: "Cập nhật nhắc việc thành công!"
            })
        } else {
            return ({
                errCode: 1,
                errMessage: "Nhắc việc này không tồn tại!"
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
}