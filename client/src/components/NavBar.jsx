import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ currentPage, totalPages, prevPage, nextPage }) => {
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
      <input type="text" placeholder="Buscar..." />
      <select>
        <option value="filtro1">Filtro 1</option>
        <option value="filtro2">Filtro 2</option>
      </select>
    </div>
  );
};

export default NavBar;

