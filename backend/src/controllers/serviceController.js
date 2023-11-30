import serviceService from "../services/serviceService";

let handleGetAllService = async (req, res) => {
    let page = req.query.page;
    let limit = 20;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let allService = [];

    let services = await serviceService.getAllServices();
    allService = services;
    let totalService = services.length;
    let pageCount = Math.ceil(totalService / limit);

    if (endIndex < totalService) {
        services.next = {
            page: page + 1,
            limit: limit
        }

    }
    if (startIndex > 0) {
        services.prev = {
            page: page - 1,
            limit: limit
        }
    }
    services = services.slice(startIndex, endIndex);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        listService: services,
        allService: allService,
        currentPage: page,
        pageCount: pageCount,
        startIndex: startIndex,
        totalService: totalService
    })
}

let handleGetAllcodesType = async (req, res) => {
    let page = req.query.page;
    let limit = 30;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let allType = [];

    let type = await serviceService.getAllcodesType();
    allType = type;
    let totalType = type.length;
    let pageCount = Math.ceil(totalType / limit);

    if (endIndex < totalType) {
        type.next = {
            page: page + 1,
            limit: limit
        }

    }
    if (startIndex > 0) {
        type.prev = {
            page: page - 1,
            limit: limit
        }
    }
    type = type.slice(startIndex, endIndex);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        type: type,
        allType: allType,
        currentPage: page,
        pageCount: pageCount,
        startIndex: startIndex,
        totalType: totalType
    })
}

let handleGetAllServiceWithType = async (req, res) => {
    let type = req.query.type
    let serviceWithType = await serviceService.getAllServiceWithType(type);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        serviceWithType: serviceWithType
    })
}

let handleAddNewService = async (request, res) => {
    let data = request.body
    if (!data.serviceName || !data.serviceThemeId || !data.price) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing inputs parameter!"
        })
    }
    let message = await serviceService.addNewService(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleAddNewServiceType = async (request, res) => {
    let data = request.body;
    if (!data.valueEN || !data.valueVI || !data.key || !data.type) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing inputs parameter!"
        })
    }
    let message = await serviceService.addNewServiceType(data);
    console.log(message)
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}
let handleEditServiceType = async (req, res) => {
    let data = req.body;
    let message = await serviceService.editServiceType(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    });
}

let handleEditService = async (req, res) => {
    let data = req.body;
    if (!data.id || !data.serviceName || !data.serviceThemeId || !data.price) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    let message = await serviceService.editService(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    });
}

let handleDeleteService = async (req, res) => {
    let serviceId = req.query.id;

    if (!serviceId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    if (serviceId) {
        let message = await serviceService.deleteService(serviceId);
        return res.status(200).json({
            errCode: message.errCode,
            errMessage: message.errMessage
        });
    }
}

let handleDeleteServiceType = async (req, res) => {
    let typeId = req.query.id;

    if (!typeId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    if (typeId) {
        let message = await serviceService.deleteServiceType(typeId);
        return res.status(200).json({
            errCode: message.errCode,
            errMessage: message.errMessage
        });
    }
}

module.exports = {
    handleGetAllService: handleGetAllService,
    handleGetAllServiceWithType: handleGetAllServiceWithType,
    handleAddNewService: handleAddNewService,
    handleEditService: handleEditService,
    handleDeleteService: handleDeleteService,
    handleAddNewServiceType: handleAddNewServiceType,
    handleEditServiceType: handleEditServiceType,
    handleGetAllcodesType: handleGetAllcodesType,
    handleDeleteServiceType: handleDeleteServiceType
}