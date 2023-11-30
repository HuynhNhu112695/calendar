'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductExports extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ProductExports.belongsTo(models.ProductImports, { foreignKey: 'importId', targetKey: 'id', as: 'proExport' })
            ProductExports.belongsTo(models.Products, { foreignKey: 'productId', targetKey: 'id', as: 'exportProducts' })
        }
    };
    ProductExports.init({
        productId: DataTypes.INTEGER,
        importId: DataTypes.INTEGER,
        exportDate: DataTypes.DATEONLY,
        exportQuantity: DataTypes.INTEGER,
        remainQuantity: DataTypes.INTEGER,
        note: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'ProductExports',
    });
    return ProductExports;
};