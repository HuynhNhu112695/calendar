'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Calendars extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Calendars.hasMany(models.RepeatCicles, { foreignKey: 'id', targetKey: 'idCongViec', as: 'dataCalendar' })
        }
    };
    Calendars.init({
        sovanban: DataTypes.STRING,
        ngayphathanh: DataTypes.DATEONLY,
        donviphathanh: DataTypes.STRING,
        trichyeunoidung: DataTypes.TEXT,
        chutheyeucau: DataTypes.STRING,
        noidungyeucau: DataTypes.TEXT,
        nguoithuchien: DataTypes.STRING,
        nhactruoc: DataTypes.INTEGER,
        douutien: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Calendars',
    });
    return Calendars;
};