'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class warns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  warns.init({
    staff: DataTypes.STRING,
    pseudo: DataTypes.STRING,
    raison: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'warns',
  });
  return warns;
};