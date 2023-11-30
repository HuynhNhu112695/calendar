'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Salary extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Salary.belongsTo(models.Users,
                {
                    foreignKey: 'staffId',
                    as: 'staffSalary'
                })
        }
    };
    Salary.init({
        userIdCreate: DataTypes.INTEGER,
        staffId: DataTypes.INTEGER,
        tax: DataTypes.DECIMAL(9, 2),
        cardTotal: DataTypes.DECIMAL(9, 2),
        cashTotal: DataTypes.DECIMAL(9, 2),
        bonus: DataTypes.DECIMAL(9, 2),
        receivedByCard: DataTypes.DECIMAL(9, 2),
        receivedByCash: DataTypes.DECIMAL(9, 2),
        receivedStore: DataTypes.DECIMAL(9, 2),
        receivedStaff: DataTypes.DECIMAL(9, 2),
        receivedAfterTax: DataTypes.DECIMAL(9, 2),
        dateStart: DataTypes.DATEONLY,
        dateEnd: DataTypes.DATEONLY,
        note: DataTypes.STRING,
        action: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Salary',
    });
    return Salary;
};