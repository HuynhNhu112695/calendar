'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Services extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Services.belongsTo(models.Allcodes, { foreignKey: 'serviceThemeId', targetKey: 'key', as: 'themeData' })
            Services.hasMany(models.Bookings, { foreignKey: 'id', targetKey: 'serviceId', as: 'serviceOrder' })
        }
    };
    Services.init({
        serviceName: DataTypes.STRING,
        price: DataTypes.DECIMAL(9, 2),
        serviceThemeId: DataTypes.STRING,
        description: DataTypes.TEXT,
        action: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Services',
    });
    return Services;
};