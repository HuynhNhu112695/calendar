'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UpdateStatus', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            iddangkylap: {
                type: Sequelize.INTEGER
            },
            ngaycapnhat: {
                type: Sequelize.DATEONLY
            },
            trangthaicapnhat: {
                type: Sequelize.STRING
            },
            danhgia: {
                type: Sequelize.STRING
            },
            ghichu: {
                type: Sequelize.TEXT
            },
            ngaycapnhat: {
                type: Sequelize.DATEONLY
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
        await queryInterface.dropTable('UpdateStatus');
    }
};