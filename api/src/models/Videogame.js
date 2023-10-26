const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
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
  },{ timestamps: false });
};

// const { Model, DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   class Videogame extends Model {
//     // ...
//   }

//   Videogame.init({
//     name: DataTypes.STRING,
//     description: DataTypes.TEXT,
//     platforms: DataTypes.STRING,
//     image: DataTypes.STRING,
//     releaseDate: DataTypes.DATE,
//     rating: DataTypes.FLOAT,
//   }, {
//     sequelize,
//     modelName: 'Videogame',
//   });

//   return Videogame;
// };

