'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('services', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            serviceName: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.DECIMAL(9, 2)
            },
            serviceThemeId: {
                type: Sequelize.STRING
            },
            description: {
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
        await queryInterface.dropTable('services');
    }
};