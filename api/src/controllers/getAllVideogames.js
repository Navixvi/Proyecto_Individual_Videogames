const axios = require('axios');
const { Videogame } = require('../db');

const getAllVideogames = async (req, res) => {
  const page = req.query.page || 1; // Página actual, se obtiene de la consulta
  const pageSize = 15; // Cantidad de videojuegos por página
  console.log(page);
  // Calcula el índice de inicio y fin para la paginación
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  console.log(startIndex);
  console.log(endIndex);
  try {
    // Obtén los videojuegos de la API
    const apiResponse = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page_size=${pageSize}&page=${page}`);
    const apiData = apiResponse.data.results;

    // Obtén los videojuegos de la base de datos para la página actual
    const dbData = await Videogame.findAll({
      offset: startIndex,
      limit: pageSize,
    });

    // Combina los resultados de la API y la base de datos
    const allVideogames = apiData.concat(dbData);

    return res.status(200).json({ videogames: allVideogames });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener y combinar los datos de videojuegos' });
  }
};

module.exports = getAllVideogames;