import db from "../models/index";

let getAllServices = async () => {
    try {
        let services = await db.Services.findAll({
            order: [
                ['serviceThemeId', 'DESC']
            ],
            include: [
                { model: db.Allcodes, as: 'themeData', attributes: ['valueEn', 'valueVi'] }
            ],
            where: {
                action: 1
            },
            raw: true,
            nest: true
        });
        return services;
    } catch (e) {
        return e;
    }
}

let getAllcodesType = async () => {
    try {
        let type = await db.Allcodes.findAll({
            order: [
                ['valueEN', 'DESC']
            ],
            where: {
                type: "SERVICE"
            },
            raw: true,
            nest: true
        });
        return type;
    } catch (e) {
        return e;
    }
}

let getAllServiceWithType = async (type) => {
    try {
        let serviceWithType = await db.Services.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: { serviceThemeId: type }
        });
        return serviceWithType;
    } catch (e) {
        return e;
    }
}

let checkService = async (serviceName) => {
    try {
        let service = await db.Services.findOne({
            where: { serviceName: serviceName }
        })
        if (service) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return e;
    }
}

let checkServiceType = async (valueEN) => {
    try {
        let type = await db.Allcodes.findOne({
            where: {
                type: "SERVICE",
                valueEN: valueEN
            }
        })
        if (type) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return e;
    }
}

let addNewService = async (data) => {
    try {
        let check = await checkService(data.serviceName);
        if (check === true) {
            return ({
                errCode: 1,
                errMessage: "Your service name is already in use. Please try another service name!"
            })
        } else {
            await db.Services.create({
                serviceName: data.serviceName,
                serviceThemeId: data.serviceThemeId,
                price: data.price,
                description: data.description,
                action: data.action
            })
            return ({
                errCode: 0,
                errMessage: "Create a new service succeed!"
            })
        }
    } catch (e) {
        return e;
    }
}

let addNewServiceType = async (data) => {
    try {
        let type = await checkServiceType(data.valueEN);
        if (type === true) {
            return ({
                errCode: 1,
                errMessage: "Your service type is already in use. Please try another service type!"
            })
        } else {
            await db.Allcodes.create({
                key: data.key,
                type: data.type,
                valueEN: data.valueEN,
                valueVI: data.valueVI
            })
            return ({
                errCode: 0,
                errMessage: "Create a new service type succeed!"
            })
        }
    } catch (e) {
        return e;
    }
}

let deleteService = async (serviceId) => {
    try {
        let service = await db.Services.findOne({
            where: { id: serviceId }
        });
        if (!service) {
            return ({
                errCode: 1,
                errMessage: "The service isn't exist"
            })
        }
        if (service) {
            let serBooking = await db.Bookings.findAll({
                where: { serviceId: serviceId }
            });
            if (serBooking.length === 0) {
                await db.Services.destroy({
                    where: { id: serviceId }
                });
            } else if (serBooking.length !== 0) {
                await db.Services.update({
                    action: 0
                }, {
                    where: { id: serviceId }
                });
                await db.Bookings.update({
                    action: 0
                }, {
                    where: { serviceId: serviceId }
                });
            }
            return ({
                errCode: 0,
                errMessage: "Delete service succeed!"
            })
        }
    } catch (e) {
        return e;
    }
}

let deleteServiceType = async (typeId) => {
    try {
        let type = await db.Allcodes.findOne({
            where: { id: typeId }
        });
        if (!type) {
            return ({
                errCode: 1,
                errMessage: "The service isn't exist"
            })
        }
        if (type) {
            let typeSer = await db.Services.findAll({
                where: { serviceThemeId: typeId }
            });
            if (typeSer.length === 0) {
                await db.Allcodes.destroy({
                    where: { id: typeId }
                });
            } else if (typeSer.length !== 0) {
                await db.Services.update({
                    action: 0
                }, {
                    where: { serviceThemeId: typeId }
                });
                await db.Allcodes.destroy({
                    where: { id: typeId }
                });
            }
            return ({
                errCode: 0,
                errMessage: "Delete service type succeed!"
            })
        }
    } catch (e) {
        return e;
    }
}

let editService = async (data) => {
    try {
        let service = await db.Services.findOne({
            where: { id: data.id }
        })
        if (service) {
            if (data.serviceName !== service.serviceName) {
                let check = await checkService(data.serviceName);
                if (check === true) {
                    return ({
                        errCode: 1,
                        errMessage: "Your service is already in use. Please try another service!"
                    })
                }
            }
            await db.Services.update({
                serviceName: data.serviceName,
                serviceThemeId: data.serviceThemeId,
                price: data.price,
                description: data.description
            }, { where: { id: data.id } })
            return ({
                errCode: 0,
                errMessage: "Update the service succeed!"
            })
        } else {
            return ({
                errCode: 1,
                errMessage: "The service isn't exist!"
            })
        }
    } catch (e) {
        return e;
    }
}

let editServiceType = async (data) => {
    try {
        let type = await db.Allcodes.findOne({
            where: { id: data.id }
        })
        if (type) {
            let check = await checkServiceType(data.valueEN);
            if (check === true) {
                return ({
                    errCode: 1,
                    errMessage: "Your service is already in use. Please try another service type!"
                })
            } else {
                await db.Allcodes.update({
                    valueEN: data.valueEN,
                    valueVI: data.valueVI
                }, { where: { id: data.id } })
                return ({
                    errCode: 0,
                    errMessage: "Update the service type succeed!"
                })
            }
        } else {
            return ({
                errCode: 1,
                errMessage: "The service isn't exist!"
            })
        }
    } catch (e) {
        return e;
    }
}

module.exports = {
    getAllServices: getAllServices,
    getAllServiceWithType: getAllServiceWithType,
    addNewService: addNewService,
    deleteService: deleteService,
    editService: editService,
    addNewServiceType: addNewServiceType,
    editServiceType: editServiceType,
    getAllcodesType: getAllcodesType,
    deleteServiceType: deleteServiceType
}