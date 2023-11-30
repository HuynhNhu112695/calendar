'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('schedules', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userIdCreate: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATEONLY
            },
            // timeType: {
            //     type: Sequelize.STRING
            // },
            staffId: {
                type: Sequelize.INTEGER
            },
            note: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('schedules');
    }
};