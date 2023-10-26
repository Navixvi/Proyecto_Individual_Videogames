const axios = require('axios');
const {Genres} = require('../models/Genres');


const getAllGenres = async (req, res) => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`);
        const genresFromAPI = response.data.results;

        const genresForResponse = genresFromAPI.map(genre => ({
            id: genre.id,
            name: genre.name
        }));

        const genresFromDatabase = await Genres.findAll();

        if (genresFromDatabase.length === 0 || !arraysAreEqual(genresForResponse, genresFromDatabase)) {
            await Genres.sync({ force: true }); 
            await Genres.bulkCreate(genresForResponse);
        }

        res.json(genresForResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los géneros' });
    }
};

function arraysAreEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

module.exports = getAllGenres;

