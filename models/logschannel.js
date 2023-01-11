'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logsChannel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  logsChannel.init({
    idchannel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'logsChannel',
  });
  return logsChannel;
};