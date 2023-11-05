import React from 'react';
import Card from '../components/Card';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const searchResults = location.state.searchResults;

  return (
    <div className="results">
      <h2>Resultados de la búsqueda</h2>
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

