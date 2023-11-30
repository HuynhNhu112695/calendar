'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ProductExports', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productId: {
                type: Sequelize.INTEGER
            },
            importId: {
                type: Sequelize.INTEGER
            },
            exportDate: {
                type: Sequelize.DATEONLY
            },
            nowQuantity: {
                type: Sequelize.INTEGER
            },
            exportQuantity: {
                type: Sequelize.INTEGER
            },
            remainQuantity: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('ProductExports');
    }
};