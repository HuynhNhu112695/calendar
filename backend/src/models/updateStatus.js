'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UpdateStatus extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UpdateStatus.belongsTo(models.RepeatCicles, { foreignKey: 'iddangkylap', as: 'dataStatus' })
        }
    };
    UpdateStatus.init({
        iddangkylap: DataTypes.STRING,
        trangthai: DataTypes.STRING,
        danhgia: DataTypes.STRING,
        ghichu: DataTypes.TEXT,
        ngaycapnhat: DataTypes.DATEONLY,
    }, {
        sequelize,
        modelName: 'UpdateStatus',
    });
    return UpdateStatus;
};