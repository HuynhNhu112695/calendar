import productService from "../services/productService";

let handleGetAllProduct = async (req, res) => {
    return new Promise(async (resolve, reject) => {

        let page = req.query.page;
        let limit = 20;
        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;
        let products = [];
        let productName = [];
        // let productExport = [];
        let productImport = [];
        let arrProduct = [];

        productImport = await productService.getMaxImports();
        // console.log(productImport)
        products = await productService.getAllProducts();
        // console.log(products)
        productName = await productService.getAllProNames();
        // productExport = await productService.getAllExports();

        // for (let i = 0; i <= products.length; i++) {
        let results = await products.map(async (item) => {
            // console.log(item.importDate)
            let findExport = await productService.findExport(item.id);
            let obj = {};
            if (findExport.length !== 0) {
                findExport.map(async (f) => {
                    obj = {
                        productId: item.productId,
                        productName: item.proImport.productName,
                        nowQuantity: item.proImport.nowQuantity,
                        unit: item.unitImport,
                        importId: item.id,
                        importQuantity: item.quantity,
                        price: item.price,
                        importDate: item.importDate,
                        exportId: f.id,
                        exportDate: f.exportDate,
                        exportQuantity: f.exportQuantity,
                        remainQuantity: f.remainQuantity,
                        exportNote: f.note
                    }
                    await arrProduct.push(obj);
                })
            } else {
                obj = {
                    productId: item.productId,
                    productName: item.proImport.productName,
                    nowQuantity: item.proImport.nowQuantity,
                    unit: item.unitImport,
                    importId: item.id,
                    importQuantity: item.quantity,
                    price: item.price,
                    importDate: item.importDate,
                    exportId: '',
                    exportDate: '',
                    exportQuantity: '',
                    remainQuantity: '',
                    exportNote: ''
                }
                await arrProduct.push(obj);
            }
        })
        let pro = Promise.all(results);

        let allPro = await pro.then(function (data) {
            return arrProduct;
        });
        // console.log(productName)
        let arrAllProduct = [];
        arrAllProduct = allPro;
        let totalProduct = await productName.length;
        let totalAll = await allPro.length;
        let pageCount = await Math.ceil(totalAll / limit);
        if (endIndex < totalProduct) {
            productName.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startIndex > 0) {
            productName.prev = {
                page: page - 1,
                limit: limit
            }
        }
        if (allPro) {
            allPro = await allPro.slice(startIndex, endIndex);
        }
        // console.log(allPro)
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Ok',
            products: allPro,
            arrAllProduct: arrAllProduct,
            productImports: productImport,
            currentPage: page,
            pageCount: pageCount,
            startIndex: startIndex,
            totalProduct: totalProduct
        }
        );
    })
}

let handleSearchProduct = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        let key = "ac";
        let page = req.query.page;
        let limit = 20;
        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;
        let products = [];
        let productName = [];
        // let productExport = [];
        let productImport = [];
        let arrProduct = [];

        productImport = await productService.getMaxImports();
        // console.log(productImport)
        products = await productService.getSearchAllProducts(key);
        console.log(products)
        productName = await productService.getAllProNames();
        // productExport = await productService.getAllExports();

        // for (let i = 0; i <= products.length; i++) {
        let results = await products.map(async (item) => {
            // console.log(item.importDate)
            let findExport = await productService.findExport(item.id);
            let obj = {};
            if (findExport.length !== 0) {
                findExport.map(async (f) => {
                    obj = {
                        productId: item.productId,
                        productName: item.proImport.productName,
                        nowQuantity: item.proImport.nowQuantity,
                        unit: item.unitImport,
                        importId: item.id,
                        importQuantity: item.quantity,
                        price: item.price,
                        importDate: item.importDate,
                        exportId: f.id,
                        exportDate: f.exportDate,
                        exportQuantity: f.exportQuantity,
                        remainQuantity: f.remainQuantity,
                        exportNote: f.note
                    }
                    await arrProduct.push(obj);
                })
            } else {
                obj = {
                    productId: item.productId,
                    productName: item.proImport.productName,
                    nowQuantity: item.proImport.nowQuantity,
                    unit: item.unitImport,
                    importId: item.id,
                    importQuantity: item.quantity,
                    price: item.price,
                    importDate: item.importDate,
                    exportId: '',
                    exportDate: '',
                    exportQuantity: '',
                    remainQuantity: '',
                    exportNote: ''
                }
                await arrProduct.push(obj);
            }
        })
        let pro = Promise.all(results);

        let allPro = await pro.then(function (data) {
            return arrProduct;
        });
        // console.log(productName)
        let arrAllProduct = [];
        arrAllProduct = allPro;
        let totalProduct = await productName.length;
        let totalAll = await allPro.length;
        let pageCount = await Math.ceil(totalAll / limit);
        if (endIndex < totalProduct) {
            productName.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startIndex > 0) {
            productName.prev = {
                page: page - 1,
                limit: limit
            }
        }
        if (allPro) {
            allPro = await allPro.slice(startIndex, endIndex);
        }
        // console.log(allPro)
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Ok',
            products: allPro,
            arrAllProduct: arrAllProduct,
            productImports: productImport,
            currentPage: page,
            pageCount: pageCount,
            startIndex: startIndex,
            totalProduct: totalProduct
        }
        );
    })
}

let handleGetBuyProduct = async (req, res) => {
    let page = req.query.page;
    let limit = 30;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let products = [];

    products = await productService.getBuyProducts();
    // console.log(products)
    let buyProArr = [];
    products.forEach((element) => {
        let minQuantity = element.unitPro.note;
        let nowQuantity = element.nowQuantity;
        if (!minQuantity) { minQuantity = 0; }
        // console.log(minQuantity, nowQuantity)
        if (parseInt(nowQuantity) < parseInt(minQuantity)) {
            buyProArr.push(element)
        }
    });
    let totalProduct = buyProArr.length;
    let pageCount = Math.ceil(totalProduct / limit);

    if (endIndex < totalProduct) {
        products.next = {
            page: page + 1,
            limit: limit
        }

    }
    if (startIndex > 0) {
        products.prev = {
            page: page - 1,
            limit: limit
        }
    }
    if (buyProArr) {
        buyProArr = buyProArr.slice(startIndex, endIndex);
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        buyProArr: buyProArr,
        currentPage: page,
        pageCount: pageCount,
        startIndex: startIndex,
        totalProduct: totalProduct
    })
}

let handleAddNewProduct = async (request, res) => {
    let data = request.body
    if (!data.productName || !data.quantity || !data.unit || !data.price ||
        !data.importDate) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing inputs parameter!"
        })
    }
    let message = await productService.addNewProduct(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleAddNewProExport = async (request, res) => {
    let data = request.body
    if (!data.importId || !data.exportDate || !data.exportQuantity) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing inputs parameter!"
        })
    }
    let message = await productService.addNewProExport(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleAddNewUnit = async (request, res) => {
    let data = request.body;
    let message = await productService.addNewUnit(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleEditUnit = async (req, res) => {
    let data = req.body;
    let message = await productService.editUnit(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    });
}

let handleDeleteUnit = async (req, res) => {
    let unitId = req.query.id;
    let unitKey = req.query.key;
    if (!unitId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    if (unitId) {
        let message = await productService.deleteUnit(unitId, unitKey);
        return res.status(200).json({
            errCode: message.errCode,
            errMessage: message.errMessage
        });
    }
}

let handleEditProduct = async (req, res) => {
    let data = req.body;
    if (!data.id || !data.productName || !data.quantity || !data.unit || !data.price ||
        !data.importDate || !data.expiryDate) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    let message = await productService.editProduct(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    });
}

let handleDeleteProduct = async (req, res) => {
    let importId = req.query.id;
    let productId = req.query.productId;
    if (!productId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    if (productId) {
        let message = await productService.deleteProduct(productId, importId);
        return res.status(200).json({
            errCode: message.errCode,
            errMessage: message.errMessage
        });
    }
}

let handleDeleteImportProduct = async (req, res) => {
    let importId = req.query.importId;
    let nowQuantity = req.query.nowQuantity;
    let productId = req.query.productId;
    if (!importId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    if (importId) {
        let message = await productService.deleteImportProduct(importId, nowQuantity, productId);
        return res.status(200).json({
            errCode: message.errCode,
            errMessage: message.errMessage
        });
    }
}

module.exports = {
    handleGetAllProduct: handleGetAllProduct,
    handleGetBuyProduct: handleGetBuyProduct,
    handleAddNewProduct: handleAddNewProduct,
    handleEditProduct: handleEditProduct,
    handleDeleteProduct: handleDeleteProduct,
    handleAddNewUnit: handleAddNewUnit,
    handleEditUnit: handleEditUnit,
    handleDeleteUnit: handleDeleteUnit,
    handleAddNewProExport: handleAddNewProExport,
    handleDeleteImportProduct: handleDeleteImportProduct,
    handleSearchProduct: handleSearchProduct
}