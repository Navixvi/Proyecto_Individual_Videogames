import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '../redux/action';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`http://localhost:3001/search?name=${searchQuery}`);
      const searchResults = response.data;

      dispatch(setSearchResults(searchResults));

      navigate('/results', { state: { searchResults } });
      console.log(searchResults);
    } catch (error) {
      console.error('Error al buscar videojuegos:', error);
    } finally {
      setIsLoading(false);
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
      {isLoading && <p>Cargando resultados...</p>}
    </div>
  );
};

export default SearchBar;
