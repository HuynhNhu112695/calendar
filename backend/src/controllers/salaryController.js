import salaryService from "../services/salaryService";

let handleGetAllSalary = async (req, res) => {
    let page = req.query.page;
    let limit = 30;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let salary = [];

    salary = await salaryService.getAllSalary();
    let totalSalary = salary.length;
    let pageCount = Math.ceil(totalSalary / limit);

    if (endIndex < totalSalary) {
        salary.next = {
            page: page + 1,
            limit: limit
        }

    }
    if (startIndex > 0) {
        salary.prev = {
            page: page - 1,
            limit: limit
        }
    }
    salary = salary.slice(startIndex, endIndex);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        salary: salary,
        currentPage: page,
        pageCount: pageCount,
        startIndex: startIndex
    })
}

let handleAddNewSalary = async (request, res) => {
    let data = request.body;
    if (!data.dateStart || !data.dateEnd || !data.staffId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing inputs parameter!"
        })
    }
    let message = await salaryService.addNewSalary(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleEditSalary = async (req, res) => {
    let data = req.body;
    // if (!data.dateStart || !data.dateEnd || !data.staffId
    //     || !data.receivedStore || !data.receivedStaff) {
    //     return res.status(200).json({
    //         errCode: 1,
    //         errMessage: 'Missing inputs paramater!'
    //     })
    // }
    let message = await salaryService.editSalary(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    });
}

let handleDeleteSalary = async (req, res) => {
    let salaryId = req.query.id;

    if (!salaryId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    if (salaryId) {
        let message = await salaryService.deleteSalary(salaryId);
        return res.status(200).json({
            errCode: message.errCode,
            errMessage: message.errMessage
        });
    }
}

let handleGetSalarySalary = async (req, res) => {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    let staffId = req.query.staffId;
    let totalCardpay = 0;
    let totalCashpay = 0;
    let receivedStaff = 0;
    let arrSalary = await salaryService.getSalarySalary(startDate, endDate, staffId);
    arrSalary.forEach(item => {
        if (parseInt(item.cardPay) !== 0) {
            totalCardpay = parseFloat(totalCardpay) + parseFloat(item.cardPay);
            receivedStaff = parseFloat(receivedStaff) + parseFloat(item.cardPay * item.percentOfStaff / 100);
        }
        if (parseInt(item.cashPay) !== 0) {
            totalCashpay = parseFloat(totalCashpay) + parseFloat(item.cashPay);
            receivedStaff = parseFloat(receivedStaff) + parseFloat(item.cashPay * item.percentOfStaff / 100);
        }
    })
    let total = parseFloat(totalCardpay) + parseFloat(totalCashpay);
    let receivedStore = parseFloat(total) - parseFloat(receivedStaff);
    return res.status(200).json({
        errCode: 0,
        errMessage: "Ok!",
        total: total,
        arrSalary: arrSalary,
        totalCard: totalCardpay,
        totalCash: totalCashpay,
        receivedStaff: parseFloat(receivedStaff),
        receivedStore: receivedStore
    });
}

module.exports = {
    handleGetAllSalary: handleGetAllSalary,
    handleAddNewSalary: handleAddNewSalary,
    handleEditSalary: handleEditSalary,
    handleDeleteSalary: handleDeleteSalary,
    handleGetSalarySalary: handleGetSalarySalary
}