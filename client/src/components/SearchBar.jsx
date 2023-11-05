import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/search?name=${searchQuery}`);
      const searchResults = response.data;

      // Navega a la ruta /results y pasa los resultados como estado
      navigate('/results', { state: { searchResults } });
    } catch (error) {
      console.error('Error al buscar videojuegos:', error);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar videojuegos por nombre..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
