import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar'

const NavBar = ({ currentPage, totalPages, prevPage, nextPage, handleSort }) => {
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
      <select>
        <option value="filtro1">Filtro 1</option>
        <option value="filtro2">Filtro 2</option>
      </select>
      <button onClick={handleCreate}>Crear</button>
    </div>
  );
};

export default NavBar;
``
