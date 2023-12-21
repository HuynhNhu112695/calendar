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