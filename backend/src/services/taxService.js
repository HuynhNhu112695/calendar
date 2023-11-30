import db from "../models/index";

let getAllTaxs = async () => {
    try {
        let taxs = await db.Taxs.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        return taxs;
    } catch (e) {
        return e;
    }
}

let getTaxNow = async () => {
    try {
        let taxs = await db.Taxs.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        return taxs;
    } catch (e) {
        return e;
    }
}

let checkTax = async (startDateTax, endDateTax) => {
    try {
        let tax = await db.Taxs.findOne({
            order: [
                ['createdAt', 'DESC']
            ]
        })
        if (startDateTax <= tax.endDateTax) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return e;
    }
}

let addNewTax = async (data) => {
    try {
        let check = await checkTax(data.startDateTax, data.endDateTax);
        if (check === true) {
            return ({
                errCode: 1,
                errMessage: "Your start date must be after the end date of old tax. Please try another date!"
            })
        } else {
            await db.Taxs.create({
                startDateTax: data.startDateTax,
                endDateTax: data.endDateTax,
                tax: data.tax
            })
            return ({
                errCode: 0,
                errMessage: "Create a new tax succeed!"
            })
        }
    } catch (e) {
        return e;
    }
}

let deleteTax = async (taxId) => {
    try {
        let tax = await db.Taxs.findOne({
            where: { id: taxId }
        });
        if (!tax) {
            return "The tax isn't exist";
        }

        if (tax) {
            await db.Taxs.destroy({
                where: { id: taxId }
            });
            return "Delete tax succeed!";
        }
    } catch (e) {
        return e;
    }
}

let editTax = async (data) => {
    try {
        let tax = await db.Taxs.findOne({
            where: { id: data.id }
        })
        if (tax) {
            if (data.startDateTax !== tax.startDateTax) {
                let check = await checkTax(data.startDateTax);
                if (check === true) {
                    return ({
                        errCode: 1,
                        errMessage: "Your tax is already in use. Please try another tax!"
                    })
                }
            }
            await db.Taxs.update({
                startDateTax: data.startDateTax,
                endDateTax: data.endDateTax,
                tax: data.tax
            }, { where: { id: data.id } })
            return ({
                errCode: 0,
                errMessage: "Update the tax succeed!"
            })
        } else {
            return ({
                errCode: 1,
                errMessage: "The tax isn't exist!"
            })
        }
    } catch (e) {
        return e;
    }
}

module.exports = {
    getAllTaxs: getAllTaxs,
    getTaxNow: getTaxNow,
    addNewTax: addNewTax,
    deleteTax: deleteTax,
    editTax: editTax
}