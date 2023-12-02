'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Calendars', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            sovanban: {
                type: Sequelize.STRING
            },
            ngayphathanh: {
                type: Sequelize.DATEONLY
            },
            donviphathanh: {
                type: Sequelize.STRING
            },
            trichyeunoidung: {
                type: Sequelize.TEXT
            },
            chutheyeucau: {
                type: Sequelize.STRING
            },
            noidungyeucau: {
                type: Sequelize.TEXT
            },
            nguoithuchien: {
                type: Sequelize.STRING
            },
            nhactruoc: {
                type: Sequelize.INTEGER
            },
            douutien: {
                type: Sequelize.INTEGER
            },
            userIdCreate: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Calendars');
    }
};