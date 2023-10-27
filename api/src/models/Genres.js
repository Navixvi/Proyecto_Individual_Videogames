const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Genres', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });
};