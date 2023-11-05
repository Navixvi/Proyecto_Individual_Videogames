import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ game }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/detail/${game.id}`); 
  };

  return (
    <div onClick={handleClick} className="card">
      <img src={game.background_image} alt={game.name} />
      <h3 className="heading">{game.name}</h3>
      <p>Géneros: {game.genres && game.genres.map((genre) => genre.name).join(', ')}</p>
    </div>
  );
};

export default Card;
