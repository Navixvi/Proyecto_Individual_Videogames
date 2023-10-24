const axios = require('axios');
const key = process.env.API_KEY;

const getAllVideogames = async (req, res) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${key}&page_size=100`);
    const videogames = response.data.results; 

    res.status(200).json(videogames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los videojuegos desde la API' });
  }
};

module.exports = getAllVideogames;