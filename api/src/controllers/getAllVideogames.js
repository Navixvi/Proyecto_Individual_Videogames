const axios = require('axios');
const  { Videogame } = require('../db');

const getAllVideogames = async (req, res) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`);
    const dataFromAPI = response.data.results;


    dataFromAPI.forEach(async (apiData) => {
      const {
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
      } = apiData;

      const platformsString = platforms
        ? platforms.map(platform => platform.platform.name).join(', ')
        : '';

      const videogameToStore = {
        name: name || '',
        description: description || '',
        platforms: platformsString,
        image: background_image || '',
        releaseDate: released || '',
        rating: rating || 0,
      };
     //console.log(VideogameModel);
     //console.log(videogameToStore);
    // Guarda el videojuego en la base de datos
       Videogame.create(videogameToStore);
    });

    return res.status(200).json({ message: 'Datos de videojuegos almacenados exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener y almacenar los datos de videojuegos' });
  }
};

module.exports = getAllVideogames;