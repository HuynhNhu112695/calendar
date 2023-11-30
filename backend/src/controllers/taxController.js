import taxService from "../services/taxService";

let handleGetAllTax = async (req, res) => {
    let page = req.query.page;
    let limit = 30;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let taxs = [];

    taxs = await taxService.getAllTaxs();
    let totalTax = taxs.length;
    let pageCount = Math.ceil(totalTax / limit);

    if (endIndex < totalTax) {
        taxs.next = {
            page: page + 1,
            limit: limit
        }

    }
    if (startIndex > 0) {
        taxs.prev = {
            page: page - 1,
            limit: limit
        }
    }
    taxs = taxs.slice(startIndex, endIndex);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        taxs: taxs,
        currentPage: page,
        pageCount: pageCount,
        startIndex: startIndex
    })
}

let handleGetTaxNow = async (req, res) => {
    let startDate = req.query.startDate;
    let taxs = await taxService.getTaxNow();
    let tax = [];
    let errCode = 0;
    let errMessage = '';
    taxs.forEach(item => {
        if (item.startDateTax <= startDate && startDate <= item.endDateTax) {
            tax = item.tax;
            errMessage = "Get tax succeed!"
        } else if (startDate > item.endDateTax) {
            tax = '';
            errCode = 1;
            errMessage = "Please, Add a new tax suitable for the start date!"
        }
    });

    return res.status(200).json({
        errCode: errCode,
        errMessage: errMessage,
        taxNow: tax
    })
}

let handleAddNewTax = async (request, res) => {
    let data = request.body
    if (!data.startDateTax || !data.endDateTax || !data.tax) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing inputs parameter!"
        })
    }
    let message = await taxService.addNewTax(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleEditTax = async (req, res) => {
    let data = req.body;
    if (!data.id || !data.startDateTax || !data.endDateTax || !data.tax) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    let message = await taxService.editTax(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    });
}

let handleDeleteTax = async (req, res) => {
    let taxId = req.query.id;

    if (!taxId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    if (taxId) {
        let message = await taxService.deleteTax(taxId);
        return res.status(200).json({
            errCode: 0,
            errMessage: message
        });
    }
}

module.exports = {
    handleGetAllTax: handleGetAllTax,
    handleAddNewTax: handleAddNewTax,
    handleEditTax: handleEditTax,
    handleDeleteTax: handleDeleteTax,
    handleGetTaxNow: handleGetTaxNow
}