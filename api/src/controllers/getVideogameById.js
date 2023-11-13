const axios = require('axios');
const { Videogame, Genre, VideojuegoGenero } = require('../db');

async function getVideogameById(req, res) {
  const { id, uuid } = req.params;

  try {
    if (uuid != undefined && isValidUUID(uuid)) {
      const dbVideogame = await getVideogameFromDatabase(uuid);

      if (dbVideogame) {
        console.log('Videojuego encontrado en la base de datos:', dbVideogame);
        return res.status(200).json(dbVideogame);
      } else {
        console.log('El videojuego no se encontró en la base de datos.');
        throw new Error('El videojuego no se encontró en la base de datos.');
      }
    }

    const apiVideogame = await getVideogameFromAPI(id);
    res.status(200).json(apiVideogame);
  } catch (error) {
    console.error('Error al obtener el videojuego por ID:', error.message);
    res.status(500).json({ error: 'Error al obtener el videojuego por ID' });
  }
}

function isValidUUID(uuid) {
  return /^[0-9a-fA-F-]{36}$/.test(uuid);
}

async function getVideogameFromDatabase(uuid) {
  try {
    const dbVideogame = await Videogame.findOne({
      where: { id: uuid },
      include: [
        {
          model: Genre,
          as: 'genres',
          through: {
            model: VideojuegoGenero,
          },
        },
      ],
    });

    if (dbVideogame) {
      // Convierte las plataformas de un string a un array
      dbVideogame.platforms = dbVideogame.platforms.split(', ').map(platform => platform.trim());
      console.log('Videojuego encontrado en la base de datos:', dbVideogame);
    } else {
      console.log('El videojuego no se encontró en la base de datos.');
    }

    return dbVideogame;
  } catch (error) {
    console.error('Error al obtener el videojuego de la base de datos:', error.message);
    return null;
  }
}

async function getVideogameFromAPI(id) {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`);
    console.log('Videojuego obtenido de la API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el videojuego de la API:', error.message);
    throw error;
  }
}

module.exports = {
  getVideogameById,
};
