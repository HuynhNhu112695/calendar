'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedules extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Schedules.belongsTo(models.Users, { foreignKey: 'staffId', as: 'staffInfo' })
            // Schedules.belongsTo(models.Allcodes, { foreignKey: 'timeType', targetKey: 'key', as: 'timeTypeData' })
        }
    };
    Schedules.init({
        userIdCreate: DataTypes.INTEGER,
        date: DataTypes.DATEONLY,
        // timeType: DataTypes.STRING,
        staffId: DataTypes.INTEGER,
        note: DataTypes.TEXT,
        action: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Schedules',
    });
    return Schedules;
};