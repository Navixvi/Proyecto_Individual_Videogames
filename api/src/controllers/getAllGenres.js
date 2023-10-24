const axios = require('axios');
const key = process.env.API_KEY; 

const getAllGenres = async (req, res) => {
    try {
      const genresFromDatabase = await Genres.findAll();
  
      if (genresFromDatabase.length > 0) {
        res.json(genresFromDatabase);
      } else {
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${key}`);
        const genresFromAPI = response.data;
  
        await Genres.bulkCreate(genresFromAPI);

        res.json(genresFromAPI);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los géneros' });
    }
  };

  module.exports = getAllGenres;
  