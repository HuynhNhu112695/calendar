'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Products.hasMany(models.ProductImports, { foreignKey: 'productId', as: 'proImport' })
            Products.belongsTo(models.Allcodes, { foreignKey: 'unit', targetKey: 'key', as: 'unitPro' })
            Products.hasMany(models.ProductExports, { foreignKey: 'productId', as: 'exportProducts' })
        }
    };
    Products.init({
        productName: DataTypes.STRING,
        nowQuantity: DataTypes.INTEGER,
        unit: DataTypes.STRING,
        note: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Products',
    });
    return Products;
};