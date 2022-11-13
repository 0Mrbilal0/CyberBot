'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class descriptionRP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  descriptionRP.init({
    description: DataTypes.STRING,
    pseudo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'descriptionRP',
  });
  return descriptionRP;
};