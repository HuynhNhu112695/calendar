'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('salaries', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userIdCreate: {
                type: Sequelize.INTEGER
            },
            staffId: {
                type: Sequelize.INTEGER
            },
            tax: {
                type: Sequelize.DECIMAL(9, 2)
            },
            cardTotal: {
                type: Sequelize.DECIMAL(9, 2)
            },
            cashTotal: {
                type: Sequelize.DECIMAL(9, 2)
            },
            bonus: {
                type: Sequelize.DECIMAL(9, 2)
            },
            receivedStore: {
                type: Sequelize.DECIMAL(9, 2)
            },
            receivedStaff: {
                type: Sequelize.DECIMAL(9, 2)
            },
            receivedByCard: {
                type: Sequelize.DECIMAL(9, 2)
            },
            receivedAfterTax: {
                type: Sequelize.DECIMAL(9, 2)
            },
            receivedByCash: {
                type: Sequelize.DECIMAL(9, 2)
            },
            dateStart: {
                type: Sequelize.DATEONLY
            },
            dateEnd: {
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
        await queryInterface.dropTable('salaries');
    }
};