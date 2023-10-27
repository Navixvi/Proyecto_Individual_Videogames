const axios = require('axios');
const { Videogame } = require('../db');

const getAllVideogames = async (req, res) => {
  try {
    // Primero, obtén los videojuegos de la API
    const apiResponse = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`);
    const apiData = apiResponse.data.results;

    // Luego, obtén los videojuegos de la base de datos
    const dbData = await Videogame.findAll();

    // Utilizamos un conjunto (Set) para evitar duplicados
    const allVideogamesSet = new Set();

    // Agregamos los videojuegos de la API al conjunto
    apiData.forEach((apiGame) => {
      allVideogamesSet.add(JSON.stringify(apiGame));
    });

    // Agregamos los videojuegos de la base de datos al conjunto
    dbData.forEach((dbGame) => {
      allVideogamesSet.add(JSON.stringify(dbGame));
    });

    // Convertimos el conjunto de nuevo a una lista
    const allVideogames = Array.from(allVideogamesSet).map((game) => JSON.parse(game));

    return res.status(200).json({ videogames: allVideogames });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener y combinar los datos de videojuegos' });
  }
};

module.exports = getAllVideogames;
