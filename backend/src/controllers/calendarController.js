import calendarService from "../services/calendarService";

let handleGetAllCalendar = async (req, res) => {
    let page = req.query.page;
    let limit = 10;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let calendar = [];

    calendar = await calendarService.getAllCalendar();
    let totalCalendar = calendar.length;
    let pageCount = Math.ceil(totalCalendar / limit);

    if (endIndex < totalCalendar) {
        calendar.next = {
            page: page + 1,
            limit: limit
        }

    }
    if (startIndex > 0) {
        calendar.prev = {
            page: page - 1,
            limit: limit
        }
    }
    if (calendar) {
        calendar = calendar.slice(startIndex, endIndex);
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        calendar: calendar,
        currentPage: page,
        pageCount: pageCount,
        startIndex: startIndex
    })
}

let handleGetAllDeadline = async (req, res) => {
    let page = req.query.page;
    let limit = 10;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let calendar = [];
    let arrDeadline = [];
    let getDateNow = new Date();
    let dateNow = getDateNow.getFullYear() + '-' + (getDateNow.getMonth() + 1) + '-' + getDateNow.getDate();
    // console.log(dateNow)
    calendar = await calendarService.getAllCalendar();
    // console.log(calendar)
    let results = await calendar.map(async (item) => {
        let obj = {};
        // console.log(item)
        let ngaynhacMin = new Date(item.ngaylap);
        // console.log(ngaynhacMin)
        let nhacMin = ngaynhacMin.getDate() - item.dataCalendar.nhactruoc;
        let dateMin = ngaynhacMin.getFullYear() + '-' + (ngaynhacMin.getMonth() + 1) + '-' + nhacMin;
        let ngayconlai = ngaynhacMin.getDate() - getDateNow.getDate();
        if (item.trangthai === 0) {
            if ((ngaynhacMin.getMonth() + 1) === (getDateNow.getMonth() + 1)) {
                if (dateNow >= dateMin && dateNow <= item.ngaylap) {
                    obj = {
                        id: item.id,
                        idcongviec: item.idcongviec,
                        chukylap: item.chukylap,
                        ngaylap: item.ngaylap,
                        trangthai: item.trangthai,
                        ngayconlai: ngayconlai,
                        dataCalendar: {
                            sovanban: item.dataCalendar.sovanban,
                            ngayphathanh: item.dataCalendar.ngayphathanh,
                            chutheyeucau: item.dataCalendar.chutheyeucau,
                            nguoithuchien: item.dataCalendar.nguoithuchien,
                            noidungyeucau: item.dataCalendar.noidungyeucau,
                            nhactruoc: item.dataCalendar.nhactruoc,
                            donviphathanh: item.dataCalendar.donviphathanh,
                            trichyeunoidung: item.dataCalendar.trichyeunoidung,
                            douutien: item.dataCalendar.douutien
                        }
                    }
                    arrDeadline.push(obj);
                }
            }
        }
    })
    let dead = Promise.all(results);

    let allCalendar = await dead.then(function (data) {
        return arrDeadline;
    });
    let totalCalendar = allCalendar.length;
    let pageCount = Math.ceil(totalCalendar / limit);

    if (endIndex < totalCalendar) {
        calendar.next = {
            page: page + 1,
            limit: limit
        }

    }
    if (startIndex > 0) {
        calendar.prev = {
            page: page - 1,
            limit: limit
        }
    }
    if (allCalendar) {
        allCalendar = allCalendar.slice(startIndex, endIndex);
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        calendar: allCalendar,
        currentPage: page,
        pageCount: pageCount,
        startIndex: startIndex
    })
}

let handleAddNewCalendar = async (request, res) => {
    let data = request.body;
    let arrRepeat = [];
    let obj = {};
    if (data.motlan) {
        obj = {
            chukylap: 0,
            ngaylap: data.motlan
        }
        await arrRepeat.push(obj);
    }
    if (data.moithang) {
        obj = {
            chukylap: 1,
            ngaylap: data.moithang
        }
        await arrRepeat.push(obj);
    }
    if (data.sauthang) {
        obj = {
            chukylap: 2,
            ngaylap: data.sauthang
        }
        await arrRepeat.push(obj);
    }
    if (data.chinthang) {
        obj = {
            chukylap: 3,
            ngaylap: data.chinthang
        }
        await arrRepeat.push(obj);
    }
    if (data.quyI) {
        obj = {
            chukylap: 4,
            ngaylap: data.quyI
        }
        await arrRepeat.push(obj);
    }
    if (data.quyII) {
        obj = {
            chukylap: 5,
            ngaylap: data.quyII
        }
        await arrRepeat.push(obj);
    }
    if (data.quyIII) {
        obj = {
            chukylap: 6,
            ngaylap: data.quyIII
        }
        await arrRepeat.push(obj);
    }
    if (data.quyIV) {
        obj = {
            chukylap: 7,
            ngaylap: data.quyIV
        }
        await arrRepeat.push(obj);
    }
    if (data.moinam) {
        obj = {
            chukylap: 8,
            ngaylap: data.moinam
        }
        await arrRepeat.push(obj);
    }

    let message = await calendarService.addNewCalendar(data, arrRepeat);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    });
}

let handleEditCalendar = async (req, res) => {
    let data = req.body;
    let arrRepeat = [];
    let obj = {};
    if (data.motlan) {
        obj = {
            chukylap: 0,
            ngaylap: data.motlan
        }
        await arrRepeat.push(obj);
    }
    if (data.moithang) {
        obj = {
            chukylap: 1,
            ngaylap: data.moithang
        }
        await arrRepeat.push(obj);
    }
    if (data.sauthang) {
        obj = {
            chukylap: 2,
            ngaylap: data.sauthang
        }
        await arrRepeat.push(obj);
    }
    if (data.chinthang) {
        obj = {
            chukylap: 3,
            ngaylap: data.chinthang
        }
        await arrRepeat.push(obj);
    }
    if (data.quyI) {
        obj = {
            chukylap: 4,
            ngaylap: data.quyI
        }
        await arrRepeat.push(obj);
    }
    if (data.quyII) {
        obj = {
            chukylap: 5,
            ngaylap: data.quyII
        }
        await arrRepeat.push(obj);
    }
    if (data.quyIII) {
        obj = {
            chukylap: 6,
            ngaylap: data.quyIII
        }
        await arrRepeat.push(obj);
    }
    if (data.quyIV) {
        obj = {
            chukylap: 7,
            ngaylap: data.quyIV
        }
        await arrRepeat.push(obj);
    }
    if (data.moinam) {
        obj = {
            chukylap: 8,
            ngaylap: data.moinam
        }
        await arrRepeat.push(obj);
    }
    let message = await calendarService.editCalendar(data, arrRepeat);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    });
}

let handleDeleteCalendar = async (req, res) => {
    let calendarId = req.query.id;
    if (!calendarId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    if (calendarId) {
        let message = await calendarService.deleteCalendar(calendarId);
        return res.status(200).json({
            errCode: message.errCode,
            errMessage: message.errMessage
        });
    }
}

module.exports = {
    handleGetAllCalendar: handleGetAllCalendar,
    handleGetAllDeadline: handleGetAllDeadline,
    handleAddNewCalendar: handleAddNewCalendar,
    handleEditCalendar: handleEditCalendar,
    handleDeleteCalendar: handleDeleteCalendar
}