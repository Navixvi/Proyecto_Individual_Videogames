import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const NavBar = ({ currentPage, totalPages, prevPage, nextPage, handleSort, genres, handleGenreChange }) => {
  const navigate = useNavigate();

  const handleSearch = (searchResults) => {
    console.log('Resultados de búsqueda:', searchResults);
    navigate('/home');
  };

  const handleCreate = () => {
    navigate('/create');
  };

  return (
    <div className="navbar">
      <Link to="/home">
        <img src="/src/images/house.png" alt="Home" />
      </Link>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Anterior
      </button>
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Siguiente
      </button>
      <button onClick={() => handleSort('asc')}>Ordenar A-Z</button>
      <button onClick={() => handleSort('desc')}>Ordenar Z-A</button>
      <SearchBar onSearch={handleSearch} />
      <div className="genre-filters">
        <h3>Selecciona géneros:</h3>
        <select onChange={handleGenreChange}>
          <option value="">Todos</option>
          {genres && genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleCreate}>Crear</button>
    </div>
  );
};

export default NavBar;
