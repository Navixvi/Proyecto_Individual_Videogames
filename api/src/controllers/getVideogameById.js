const axios = require('axios');
const { Videogame, Genres } = require('../db');

async function getVideogameById(req, res) {
  const { id } = req.params;

  try {
    if (!isNaN(id)) {
      // Buscar en la API usando axios
      const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`);
      const videogame = response.data;
      res.status(200).json(videogame);
    } else {
      // Buscar en la base de datos
      const videogame = await getVideogameFromDatabase(id); // Implementa esta función
      res.status(200).json(videogame);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el videojuego por ID' });
  }
}

// Implementa la función para obtener un videojuego de la base de datos
async function getVideogameFromDatabase(id) {
  try {
    // Realiza la consulta a la base de datos utilizando el modelo Videogame
    const videogame = await Videogame.findByPk(id, {
      include: Genres, // Incluye los datos del género asociado al videojuego
    });

    return videogame;
  } catch (error) {
    throw error; // Manejo de errores adecuado para la base de datos
  }
}

module.exports = {
  getVideogameById,
};
