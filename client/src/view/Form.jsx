import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function CreateVideogameForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    platforms: '',
    image: '',
    releaseDate: '',
    rating: '',
    genreIds: [], // Aquí almacenaremos los géneros seleccionados
    userId: 1,
  });

  const [genres, setGenres] = useState([]); // Aquí almacenaremos la lista de géneros

  // Realiza la solicitud GET para obtener la lista de géneros
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get('http://localhost:3001/genres');
        if (response.status === 200) {
          setGenres(response.data); // Almacena la lista de géneros en el estado
        }
      } catch (error) {
        console.error('Error al obtener la lista de géneros:', error);
      }
    }

    fetchGenres();
  }, []); // La dependencia vacía asegura que la solicitud se realice solo una vez al cargar el componente

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenreSelection = (event) => {
    const selectedGenres = Array.from(event.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, genreIds: selectedGenres });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/videogames/create', formData);

      if (response.status === 201) {
        // El videojuego se creó con éxito, redirigir a /home
        navigate('/home');
      } else {
        // Manejar errores
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejar errores de red, etc.
    }
  };

  return (
    <div className="create-videogame-form">
     <Link to="/home" className="link-volver-atras">Volver a Home</Link> 
      <h2>Crear Nuevo Videojuego</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="name" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input type="text" name="description" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Plataformas</label>
          <input type="text" name="platforms" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Imagen</label>
          <input type="text" name="image" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Fecha de Lanzamiento</label>
          <input type="date" name="releaseDate" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Calificación</label>
          <input type="number" name="rating" min="0" max="5" step="0.01" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Géneros</label>
          <select name="genreIds" multiple onChange={handleGenreSelection}>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CreateVideogameForm;
