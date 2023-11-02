import React from 'react';

const Card = ({ game }) => {
  return (
   
  <div className="card">
  <img src={game.background_image} alt={game.name} />
  <h3 className="heading">{game.name}</h3>
  <p>Géneros: {game.genres.map((genre) => genre.name).join(', ')}</p>
  </div>

    
  );
};

export default Card;




