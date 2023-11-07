const { Op } = require('sequelize');
const axios = require('axios');
const { Videogame } = require('../db');

const searchVideoGamesByName = async (req, res) => {
  const { name } = req.query;

  try {
    const videoGamesFromDatabase = await Videogame.findAll({
      attributes: ['id', 'name', 'description', 'platforms', 'image', 'releaseDate'],
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Búsqueda insensible a mayúsculas y minúsculas
        },
      },
      limit: 15,
    });
    
    if (videoGamesFromDatabase.length === 0) {
      const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${name}`);
      
      const videoGamesFromAPI = response.data.results.slice(0, 15).map((game) => ({
        id: game.id,
        name: game.name,
        image: game.image,
      }));

      console.log(videoGamesFromAPI);
      if (videoGamesFromAPI.length === 0) {
        res.status(404).json({ error: 'No se encontraron videojuegos con ese nombre.' });
      } else {
        res.status(200).json(videoGamesFromAPI);
      }
    } else {
      res.status(200).json(videoGamesFromDatabase);
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar videojuegos por nombre' });
  }
};

module.exports = searchVideoGamesByName;
