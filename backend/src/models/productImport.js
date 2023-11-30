'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductImports extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ProductImports.belongsTo(models.Allcodes, { foreignKey: 'unit', targetKey: 'key', as: 'unitImport' })
            ProductImports.belongsTo(models.Products, { foreignKey: 'productId', targetKey: 'id', as: 'proImport' })
            ProductImports.hasMany(models.ProductExports, { foreignKey: 'productId', as: 'proExport' })
        }
    };
    ProductImports.init({
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        unit: DataTypes.STRING,
        price: DataTypes.DECIMAL(9, 2),
        importDate: DataTypes.DATEONLY,
        note: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'ProductImports',
    });
    return ProductImports;
};