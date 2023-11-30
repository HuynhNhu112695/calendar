'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Taxs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Taxs.init({
        startDateTax: DataTypes.DATEONLY,
        endDateTax: DataTypes.DATEONLY,
        tax: DataTypes.DECIMAL(9, 2),
        action: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Taxs',
    });
    return Taxs;
};