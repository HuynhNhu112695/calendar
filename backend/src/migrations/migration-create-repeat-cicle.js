'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('RepeatCicles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idcongviec: {
                type: Sequelize.INTEGER
            },
            motlan: {
                type: Sequelize.DATEONLY
            },
            moithang: {
                type: Sequelize.INTEGER
            },
            sauthang: {
                type: Sequelize.DATEONLY
            },
            chinthang: {
                type: Sequelize.INTEGER
            },
            quyI: {
                type: Sequelize.DATEONLY
            },
            quyII: {
                type: Sequelize.INTEGER
            },
            quyIII: {
                type: Sequelize.DATEONLY
            },
            quyIV: {
                type: Sequelize.INTEGER
            },
            moinam: {
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
        await queryInterface.dropTable('RepeatCicles');
    }
};