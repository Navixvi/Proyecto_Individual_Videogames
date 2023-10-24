const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Favorites', {
    id: {
      type: DataTypes.UUID, 
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4, 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT, 
    },
    platforms: {
      type: DataTypes.STRING, 
    },
    image: {
      type: DataTypes.STRING,
    },
    releaseDate: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.FLOAT, 
    },
  });
};
