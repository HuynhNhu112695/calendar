'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bookings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userIdCreate: {
                type: Sequelize.INTEGER
            },
            customerName: {
                type: Sequelize.STRING
            },
            staffId: {
                type: Sequelize.INTEGER
            },
            // percentOfStaff: {
            //     type: Sequelize.DECIMAL(9, 2)
            // },
            themeId: {
                type: Sequelize.STRING
            },
            serviceId: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.DECIMAL(9, 2)
            },
            discount: {
                type: Sequelize.INTEGER
            },
            total: {
                type: Sequelize.DECIMAL(9, 2)
            },
            cashPay: {
                type: Sequelize.DECIMAL(9, 2)
            },
            cardPay: {
                type: Sequelize.DECIMAL(9, 2)
            },
            date: {
                type: Sequelize.DATEONLY
            },
            note: {
                type: Sequelize.STRING
            },
            action: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('bookings');
    }
};