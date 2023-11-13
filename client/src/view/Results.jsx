import React from 'react';
import Card from '../components/Card';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const searchResults = location.state.searchResults;
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/home'); 
  };

  return (
    <div className="results">
      <h2>Resultados de la búsqueda</h2>
      <button onClick={handleGoBack}>Volver a Home</button>
      <div className="card-list">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((game) => (
            <Card key={game.id} game={game} />
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default Results;

