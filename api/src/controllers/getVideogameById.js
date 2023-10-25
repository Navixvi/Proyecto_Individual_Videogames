const axios = require('axios');
const key = process.env.API_KEY; 

const getVideogameById = async (req, res) => {
  const { idVideogame } = req.params; 

  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=d4ea8f08c5474a05a63307882cbd5da1`);
    const videogame = response.data; 

    if (!videogame) {
      return res.status(404).json({ message: 'Videojuego no encontrado' });
    }

    res.status(200).json(videogame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el videojuego por ID desde la API de RAWG' });
  }
};

module.exports = getVideogameById;

  
  
  
  