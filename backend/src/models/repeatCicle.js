'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RepeatCicles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // repeatCicle.hasMany(models.ChuKy, { foreignKey: 'idchuky', as: 'dataChuKy' })
            RepeatCicles.hasMany(models.UpdateStatus, { foreignKey: 'id', targetKey: 'iddangkylap', as: 'dataStatus' })
            RepeatCicles.belongsTo(models.Calendars, { foreignKey: 'idcongviec', as: 'dataCalendar' })
        }
    };
    RepeatCicles.init({
        idcongviec: DataTypes.INTEGER,
        chukylap: DataTypes.INTEGER,
        ngaylap: DataTypes.DATEONLY,
        trangthai: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'RepeatCicles',
    });
    return RepeatCicles;
};