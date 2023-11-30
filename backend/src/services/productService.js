import db from "../models/index";
import { Sequelize } from "../models/index";
const { Op } = require('sequelize');

let getAllProducts = async () => {
    try {
        let products = await db.ProductImports.findAll({
            include: [
                { model: db.Products, as: 'proImport', attributes: ['id', 'productName', 'unit', 'nowQuantity'] },
                { model: db.Allcodes, as: 'unitImport', attributes: ['valueEN', 'valueVI', 'key'] },
                // { model: db.ProductExports, as: 'proExport', attributes: ['id', 'exportDate', 'exportQuantity', 'remainQuantity', 'note'], paranoid: true, required: false },
            ],
            order: [
                ['proImport', 'productName', 'ASC'],
                ['importDate', 'DESC'],
                // ['productId', 'DESC'],
                // ['proExport', 'exportDate', 'DESC']
            ],
            raw: true,
            nest: true,
            //logging: true,
        });
        return products;
    } catch (e) {
        return e;
    }
}

let getSearchAllProducts = async (key) => {
    try {
        let products = await db.ProductImports.findAll({
            include: [
                { model: db.Products, as: 'proImport', attributes: ['id', 'productName', 'unit', 'nowQuantity'] },
                { model: db.Allcodes, as: 'unitImport', attributes: ['valueEN', 'valueVI', 'key'] },
                // { model: db.ProductExports, as: 'proExport', attributes: ['id', 'exportDate', 'exportQuantity', 'remainQuantity', 'note'], paranoid: true, required: false },
            ],
            order: [
                ['proImport', 'productName', 'ASC'],
                ['importDate', 'DESC'],
                // ['productId', 'DESC'],
                // ['proExport', 'exportDate', 'DESC']
            ],
            where: {
                [Op.or]: [
                    {
                        'proImport.productName': {
                            [Op.iLike]: "%" + key + "%",
                        },
                    }
                ],
            },
            raw: true,
            nest: true,
            //logging: true,
        });
        return products;
    } catch (e) {
        return e;
    }
}

let getMaxImports = async () => {
    try {
        let productImports = await db.ProductImports.findAll({
            attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'maxId'], 'productId', [Sequelize.fn('max', Sequelize.col('importDate')), 'maxDate']],
            // include: [
            //     { model: db.Allcodes, as: 'unitImport', attributes: ['valueEN', 'valueVI'] }
            // ],
            group: [
                'productId'
            ],
            // order: [
            //     ['id', 'DESC']
            // ],
            raw: true,
            nest: true,
        });
        return productImports;
    } catch (e) {
        return e;
    }
}

let getAllExports = async (importId) => {
    try {
        let allExport = await db.ProductExports.findAll({
            order: [
                ['exportDate', 'DESC']
            ],
        });
        return allExport;
    } catch (e) {
        return e;
    }
}

let findExport = async (importPro) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allExport = await db.ProductExports.findAll({
                order: [
                    ['exportDate', 'DESC']
                ],
                where: {
                    importId: importPro
                }
            });
            resolve(allExport);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllProNames = async () => {
    try {
        let products = await db.Products.findAll({
            // group: [
            //     'productName'
            // ],
            order: [
                ['productName', 'ASC']
            ],
            raw: true,
            nest: true,
            //logging: true,
        });
        return products;
    } catch (e) {
        return e;
    }
}

let getBuyProducts = async () => {
    try {
        let products = await db.Products.findAll({
            include: [
                { model: db.Allcodes, as: 'unitPro', attributes: ['valueEN', 'valueVI', 'note'] }
            ],
            raw: true,
            nest: true,
            //logging: true,
        });
        return products;
    } catch (e) {
        return e;
    }
}

let checkProduct = async (productName) => {
    try {
        let product = await db.Products.findOne({
            where: {
                productName: productName
            }
        })
        return product;
    } catch (e) {
        return e;
    }
}

let addNewProExport = async (data) => {
    try {
        await db.Products.update({
            nowQuantity: data.remainQuantity
        }, { where: { id: data.productId } })
        await db.ProductExports.create({
            productId: data.productId,
            importId: data.importId,
            exportQuantity: data.exportQuantity,
            remainQuantity: data.remainQuantity,
            exportDate: data.exportDate,
            note: data.note
        })
        return ({
            errCode: 0,
            errMessage: "Export product succeed!"
        })
    } catch (e) {
        return e;
    }
}

let addNewProduct = async (data) => {
    try {
        if (data.productId) {
            await db.Products.update({
                nowQuantity: data.nowQuantity
            }, { where: { id: data.productId } })
            await db.ProductImports.create({
                productId: data.productId,
                productName: data.productName,
                quantity: data.quantity,
                unit: data.unit,
                price: data.price,
                importDate: data.importDate,
                note: data.note
            })
            return ({
                errCode: 0,
                errMessage: "Import product succeed!"
            })
        } else {
            let check = await checkProduct(data.productName);
            if (check) {
                await db.Products.update({
                    nowQuantity: parseInt(check.nowQuantity) + parseInt(data.quantity)
                },
                    { where: { id: check.id } })
                await db.ProductImports.create({
                    productId: check.id,
                    productName: data.productName,
                    quantity: data.quantity,
                    unit: data.unit,
                    price: data.price,
                    importDate: data.importDate,
                    note: data.note
                })
                return ({
                    errCode: 0,
                    errMessage: "Import product succeed!"
                })
            } else {
                let addPro = await db.Products.create({
                    productName: data.productName,
                    nowQuantity: data.quantity,
                    unit: data.unit
                });
                await db.ProductImports.create({
                    productId: addPro.id,
                    productName: data.productName,
                    quantity: data.quantity,
                    unit: data.unit,
                    price: data.price,
                    importDate: data.importDate,
                    note: data.note
                })
                return ({
                    errCode: 0,
                    errMessage: "Create a new product succeed!"
                })
            }
        }
    } catch (e) {
        return e;
    }
}

let checkUnit = async (valueEN) => {
    try {
        let unit = await db.Allcodes.findOne({
            where: {
                valueEN: valueEN
            }
        })
        if (unit) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return e;
    }
}

let addNewUnit = async (data) => {
    try {
        let check = await checkUnit(data.valueEN);
        if (check === true) {
            return ({
                errCode: 1,
                errMessage: "Your unit is already in use. Please try another unit!"
            })
        } else {
            await db.Allcodes.create({
                key: data.key,
                type: "UNIT",
                note: data.quantityMin,
                valueEN: data.valueEN,
                valueVI: data.valueVI
            })
            return ({
                errCode: 0,
                errMessage: "Create a new product succeed!"
            })
        }
    } catch (e) {
        return e;
    }
}

let editUnit = async (data) => {
    try {
        let unit = await db.Allcodes.findOne({
            where: { id: data.id }
        })
        if (unit) {
            if (data.valueEN !== unit.valueEN) {
                let check = await checkProduct(data.valueEN);
                if (check === true) {
                    return ({
                        errCode: 1,
                        errMessage: "Your product is already in use. Please try another product!"
                    })
                }
            }
            await db.Allcodes.update({
                note: data.quantityMin,
                valueEN: data.valueEN,
                valueVI: data.valueVI
            }, { where: { id: data.id } })
            return ({
                errCode: 0,
                errMessage: "Update the product succeed!"
            })
        } else {
            return ({
                errCode: 1,
                errMessage: "The unit isn't exist!"
            })
        }
    } catch (e) {
        return e;
    }
}

let deleteUnit = async (unitId, unitKey) => {
    try {
        let unit = await db.Allcodes.findOne({
            where: { id: unitId }
        });
        if (!unit) {
            return ({
                errCode: 1,
                errMessage: "The unit isn't exist"
            })
        }
        if (unit) {
            let pro = await db.Products.findAll({
                where: { unit: unitKey }
            });
            if (pro.length !== 0) {
                await db.Products.update({
                    action: 0
                }, {
                    where: { unit: unitKey }
                });
            }
            let proUpdate = await db.updateProducts.findAll({
                where: { unit: unitKey }
            });
            if (proUpdate.length !== 0) {
                await db.updateProducts.update({
                    action: 0
                }, {
                    where: { unit: unitKey }
                });
            }
            await db.Allcodes.destroy({
                where: { id: unitId }
            });
            return ({
                errCode: 0,
                errMessage: "Delete unit succeed!"
            })
        }
    } catch (e) {
        return e;
    }
}

let deleteProduct = async (productId, importId) => {
    try {
        let product = await db.Products.findOne({
            where: { id: productId }
        });
        if (!product) {
            return ({
                errCode: 1,
                errMessage: "The product isn't exist"
            })
        }
        if (product) {
            await db.Products.destroy({
                where: { id: productId }
            });
            await db.ProductImports.destroy({
                where: { productId: productId }
            });
            await db.ProductExports.destroy({
                where: { importId: importId }
            });
            return ({
                errCode: 0,
                errMessage: "Delete product succeed!"
            })
        }
    } catch (e) {
        return e;
    }
}

let deleteImportProduct = async (importId, nowQuantity, productId) => {
    try {
        let product = await db.ProductImports.findOne({
            where: { id: importId }
        });
        if (!product) {
            return ({
                errCode: 1,
                errMessage: "The product import isn't exist"
            })
        }
        if (product) {
            await db.ProductImports.destroy({
                where: { id: importId }
            });
            let countImport = await db.ProductImports.findAll({
                where: { productId: productId }
            });
            if (countImport.length !== 0) {
                await db.Products.update({
                    nowQuantity: nowQuantity
                }, {
                    where: { id: productId }
                });
            } else {
                await db.Products.destroy({
                    where: { id: productId }
                });
            }

            let exports = await db.ProductExports.findAll({
                where: { importId: importId }
            });
            if (exports) {
                await db.ProductExports.destroy({
                    where: { importId: importId }
                });
            }
            return ({
                errCode: 0,
                errMessage: "Delete product import succeed!"
            })
        }
    } catch (e) {
        return e;
    }
}

let editProduct = async (data) => {
    try {
        let product = await db.Products.findOne({
            where: { id: data.id }
        })
        if (product) {
            if (data.productName !== product.productName) {
                let check = await checkProduct(data.productName);
                if (check === true) {
                    return ({
                        errCode: 1,
                        errMessage: "Your product is already in use. Please try another product!"
                    })
                }
            }
            await db.Products.update({
                productName: data.productName,
                quantity: data.quantity,
                unit: data.unit,
                price: data.price,
                importDate: data.importDate,
                expiryDate: data.expiryDate,
                description: data.description
            }, { where: { id: data.id } })
            return ({
                errCode: 0,
                errMessage: "Update the product succeed!"
            })
        } else {
            return ({
                errCode: 1,
                errMessage: "The product isn't exist!"
            })
        }
    } catch (e) {
        return e;
    }
}

module.exports = {
    getAllProducts: getAllProducts,
    getSearchAllProducts: getSearchAllProducts,
    addNewProduct: addNewProduct,
    deleteProduct: deleteProduct,
    editProduct: editProduct,
    addNewUnit: addNewUnit,
    editUnit: editUnit,
    deleteUnit: deleteUnit,
    addNewProExport: addNewProExport,
    deleteImportProduct: deleteImportProduct,
    getBuyProducts: getBuyProducts,
    getAllProNames: getAllProNames,
    getAllExports: getAllExports,
    getMaxImports: getMaxImports,
    findExport: findExport
}