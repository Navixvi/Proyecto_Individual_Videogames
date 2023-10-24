'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Videogame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Videogame.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    platforms: DataTypes.STRING,
    image: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Videogame',
  });
  return Videogame;
};