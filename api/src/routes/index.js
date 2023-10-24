const { Router } = require('express');
const createVideogame = require('../controllers/createVideogame');
const getAllGenres = require('../controllers/getAllGenres');
const getAllVideogames = require('../controllers/getAllVideogames');
const getVideogameById = require('../controllers/getVideogameById');
const getVideoGamesByName = require('../controllers/searchVideogamesByName');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post('/videogames', createVideogame);
router.get('/genres', getAllGenres); 
router.get('/videogames', getAllVideogames); 
router.get('/videogames/:idVideogame', getVideogameById); 
router.get('/videogames/name', getVideoGamesByName); 



module.exports = router;
