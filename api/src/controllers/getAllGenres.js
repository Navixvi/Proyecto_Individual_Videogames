const axios = require('axios');
const { Genre } = require('../db'); 

const getAllGenres = async (req, res) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`);
    const genresFromAPI = response.data.results;

    const genresForResponse = genresFromAPI.map((genre) => ({
      id: genre.id,
      name: genre.name,
    }));

    const genresFromDatabase = await Genre.findAll();

    if (genresFromDatabase.length === 0 || !arraysAreEqual(genresForResponse, genresFromDatabase)) {
      // si no hay géneros en la base de datos o si los géneros son diferentes a los de la API, los sincronizamos y almacenamos
      // await Genres.sync({ force: true });
      await Genre.bulkCreate(genresForResponse);

    }

    res.json(genresForResponse);
  } catch (error) {
  
    res.status(500).json({ error: 'Error al obtener y almacenar los géneros' });
  }
};

function arraysAreEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

module.exports = getAllGenres;
