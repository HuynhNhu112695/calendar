'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('CallBookings', {
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
            peopleNumber: {
                type: Sequelize.INTEGER
            },
            phonenumber: {
                type: Sequelize.STRING
            },
            serviceName: {
                type: Sequelize.STRING
            },
            time: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.DATEONLY
            },
            note: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('CallBookings');
    }
};