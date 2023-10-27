const axios = require('axios');
const { Genres } = require('../db'); // Asegúrate de importar el modelo Genres desde el lugar correcto

const getAllGenres = async (req, res) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`);
    const genresFromAPI = response.data.results;

    const genresForResponse = genresFromAPI.map((genre) => ({
      id: genre.id,
      name: genre.name,
    }));

    const genresFromDatabase = await Genres.findAll();

    if (genresFromDatabase.length === 0 || !arraysAreEqual(genresForResponse, genresFromDatabase)) {
      // Si no hay géneros en la base de datos o si los géneros son diferentes a los de la API, los sincronizamos y almacenamos
      await Genres.sync({ force: true });
      await Genres.bulkCreate(genresForResponse);
    }

    res.json(genresForResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener y almacenar los géneros' });
  }
};

function arraysAreEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

module.exports = getAllGenres;
