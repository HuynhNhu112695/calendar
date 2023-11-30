'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Users.hasMany(models.Schedules, { foreignKey: 'id', targetKey: 'staffId', as: 'staffInfo' })
            Users.hasMany(models.Bookings, { foreignKey: 'id', targetKey: 'staffId', as: 'staffOrder' })
            Users.hasMany(models.Salary, { foreignKey: 'id', targetKey: 'staffId', as: 'staffSalary' })
            Users.hasMany(models.Bookings, { foreignKey: 'id', targetKey: 'customerId', as: 'customerOrder' })
            Users.belongsTo(models.Allcodes, { foreignKey: 'gender', targetKey: 'key', as: 'genderData' })
            Users.belongsTo(models.Allcodes, { foreignKey: 'roleId', targetKey: 'key', as: 'roleData' })
        }
    };
    Users.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        roleId: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        address: DataTypes.STRING,
        phonenumber: DataTypes.STRING,
        gender: DataTypes.STRING,
        birthday: DataTypes.DATEONLY,
        percentOfStaff: DataTypes.DECIMAL(9, 2),
        note: DataTypes.STRING,
        action: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Users',
    });
    return Users;
};