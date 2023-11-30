'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CallBookings extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    CallBookings.init({
        userIdCreate: DataTypes.INTEGER,
        customerName: DataTypes.STRING,
        peopleNumber: DataTypes.INTEGER,
        phonenumber: DataTypes.STRING,
        serviceName: DataTypes.STRING,
        date: DataTypes.DATEONLY,
        time: DataTypes.STRING,
        note: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'CallBookings',
    });
    return CallBookings;
};