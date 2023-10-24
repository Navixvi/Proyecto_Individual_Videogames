const axios = require('axios');

const getVideoGamesByName = async (req, res) => {
  const { name } = req.query;

  try {
    const videoGamesFromDatabase = await Videogame.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`,
        },
      },
      limit: 15,
    });

    const key = process.env.API_KEY; 
    const response = await axios.get(`https://api.rawg.io/api/games?key=${key}&search=${name}`);
    const videoGamesFromAPI = response.data.results;

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
