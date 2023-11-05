import React from 'react';
import Card from './Card';

const Results = ({ searchResults }) => {
  return (
    <div className="card-container">
      {searchResults.map((game) => (
        <Card key={game.id} game={game} />
      ))}
    </div>
  );
};

export default Results;
