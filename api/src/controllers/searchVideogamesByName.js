const axios = require('axios');
const { Sequelize } = require('sequelize');

const getVideoGamesByName = async (req, res) => {
  const { name } = req.query;

  try {
    const videoGamesFromDatabase = await Videogame.findAll({
      attributes: ['id', 'name', 'description', 'platform', 'image', 'releaseDate'],
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`,
        },
      },
      limit: 15,
    });

    const key = process.env.API_KEY; 
    const response = await axios.get(`https://api.rawg.io/api/games?key=d4ea8f08c5474a05a63307882cbd5da1&search=${name}`);
    const videoGamesFromAPI = response.data.results.map(game => ({
      id: game.id,
      name: game.name,
      description: game.description,
      platform: game.platforms.map(platform => platform.platform.name),
      image: game.background_image,
      releaseDate: game.released,
    }));

    const combinedResults = videoGamesFromDatabase.concat(videoGamesFromAPI);

    if (combinedResults.length === 0) {
      res.status(404).json({ message: 'No se encontraron videojuegos con ese nombre' });
    } else {
      res.status(200).json(combinedResults);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar videojuegos por nombre' });
  }
};

module.exports = getVideoGamesByName;
