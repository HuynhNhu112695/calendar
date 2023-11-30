'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcodes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Allcodes.hasMany(models.Users, { foreignKey: 'gender', as: 'genderData' })
            Allcodes.hasMany(models.Users, { foreignKey: 'roleId', as: 'roleData' })
            Allcodes.hasMany(models.Products, { foreignKey: 'unit', as: 'unitPro' })
            Allcodes.hasMany(models.ProductImports, { foreignKey: 'unit', as: 'unitImport' })
            Allcodes.hasMany(models.Services, { foreignKey: 'serviceThemeId', as: 'themeData' })
            // Allcodes.hasMany(models.Schedules, { foreignKey: 'timeType', as: 'timeTypeData' })
        }
    };
    Allcodes.init({
        key: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEN: DataTypes.STRING,
        valueVI: DataTypes.STRING,
        note: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Allcodes',
    });
    return Allcodes;
};