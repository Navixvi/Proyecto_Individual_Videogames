const createVideogame = async (req, res) => {
    const { name, description, platforms, image, releaseDate, rating, genreIds } = req.body;
  
    try {
      const newVideogame = await Videogame.create({
        name,
        description,
        platforms,
        image,
        releaseDate,
        rating,
      });
  
      await newVideogame.setGenres(genreIds);
  
      res.status(201).json(newVideogame);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el videojuego' });
    }
  };

  module.exports = createVideogame;