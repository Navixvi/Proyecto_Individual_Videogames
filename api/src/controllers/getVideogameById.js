const axios = require('axios');
const { Videogame, Genres } = require('../db');

// Controlador para obtener un videojuego por ID
async function getVideogameById(req, res) {
  const { id } = req.params;

  try {
    if (isValidUUID(id)) {
      // Buscar en la base de datos por UUID
      const videogame = await getVideogameFromDatabase(id);
      res.status(200).json(videogame);
    } else {
      // Buscar en la API usando axios
      const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`);
      const videogame = response.data;
      res.status(200).json(videogame);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el videojuego por ID' });
  }
}

// Función para comprobar si un valor es un UUID válido
function isValidUUID(uuid) {
  return /^[0-9a-fA-F-]{36}$/.test(uuid);
}

// Función para obtener un videojuego de la base de datos por UUID
async function getVideogameFromDatabase(uuid) {
  try {
    // Realiza la consulta a la base de datos utilizando el modelo Videogame y buscando por UUID
    const videogame = await Videogame.findOne({
      where: {
        uuid: uuid,
      },
      include: Genres, // Incluye los datos del género asociado al videojuego
    });

    if (!videogame) {
      throw new Error('Videojuego no encontrado');
    }

    return videogame;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getVideogameById,
};
