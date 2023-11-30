'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bookings extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Bookings.belongsTo(models.Users,
            //     {
            //         foreignKey: 'customerId',
            //         as: 'customerOrder'
            //     })
            Bookings.belongsTo(models.Users,
                {
                    foreignKey: 'staffId',
                    as: 'staffOrder'
                })
            Bookings.belongsTo(models.Services,
                {
                    foreignKey: 'serviceId',
                    as: 'serviceOrder'
                })
            Bookings.belongsTo(models.Allcodes,
                {
                    foreignKey: 'themeId',
                    targetKey: 'key', as: 'themeOrder'
                })
        }
    };
    Bookings.init({
        userIdCreate: DataTypes.INTEGER,
        customerName: DataTypes.STRING,
        staffId: DataTypes.INTEGER,
        // percentOfStaff: DataTypes.DECIMAL(9, 2),
        themeId: DataTypes.STRING,
        serviceId: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(9, 2),
        discount: DataTypes.INTEGER,
        total: DataTypes.DECIMAL(9, 2),
        cashPay: DataTypes.DECIMAL(9, 2),
        cardPay: DataTypes.DECIMAL(9, 2),
        date: DataTypes.DATEONLY,
        note: DataTypes.STRING,
        action: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Bookings',
    });
    return Bookings;
};