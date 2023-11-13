import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { connect } from 'react-redux';
import { setPage, setSelectedGenre } from '../redux/action';
import NavBar from '../components/NavBar';

const mapStateToProps = (state) => ({
  currentPage: state.pagination.currentPage,
  totalPages: state.pagination.totalPages,
  selectedGenre: state.selectedGenre, 
});

const Home = ({ currentPage, totalPages, setPage, selectedGenre }) => {
  const [videoGames, setVideoGames] = useState([]);
  const [filteredVideoGames, setFilteredVideoGames] = useState([]);
  const [genres, setGenres] = useState([]); // Nuevo estado para almacenar los géneros
  const [sortBy, setSortBy] = useState('asc');

  const handleGenreChange = (event) => {
    const selectedGenreId = event.target.value;
    setSelectedGenre(selectedGenreId); // Actualiza el género seleccionado en el estado de Redux

    // Filtra los juegos por el género seleccionado
    if (selectedGenreId === '') {
      setFilteredVideoGames(videoGames);
    } else {
      const filteredGames = videoGames.filter((game) => {
        return game.genres.some((genre) => genre.id === parseInt(selectedGenreId));
      });
      setFilteredVideoGames(filteredGames);
    }
  };

  useEffect(() => {
    const loadVideoGames = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/page/:page`, {
          params: {
            page: currentPage,
            genre: selectedGenre, // Agrega el género seleccionado a los parámetros de la solicitud
          },
        });
        console.log("Respuesta del servidor (videojuegos):", response.data);
        setVideoGames(response.data.videogames);
        setFilteredVideoGames(response.data.videogames);
      } catch (error) {
        console.error('Error al obtener videojuegos:', error);
      }
    };

    loadVideoGames();
  }, [currentPage, selectedGenre]); // Asegúrate de incluir selectedGenre en las dependencias

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await axios.get('http://localhost:3001/genres');
        console.log("Respuesta del servidor (géneros):", response.data);
        setGenres(response.data); // Carga los géneros desde la ruta
      } catch (error) {
        console.error('Error al obtener géneros:', error);
      }
    };

    loadGenres();
  }, []); // El segundo argumento, un array vacío, asegura que este efecto se ejecute solo una vez al cargar el componente

  const handleSort = (type) => {
    setSortBy(type);
  };

  const sortedGames = [...filteredVideoGames].sort((a, b) => {
    if (sortBy === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const nextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  return (
    <div className='home'>
      <NavBar genres={genres} handleGenreChange={handleGenreChange} selectedGenre={selectedGenre} currentPage={currentPage} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} handleSort={handleSort} />
      <h1 className='home-title'>Videogames Henry</h1>
      <div className="card-list">
        {sortedGames.map((game) => (
          <Card key={game.id} game={game} sortBy={sortBy} />
        ))}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { setPage, setSelectedGenre })(Home);
