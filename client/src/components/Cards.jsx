import React from 'react';
import Card from './Card';

const Home = ({ games }) => {
  return (
    <div className="card-container">
      {games.map((game) => (
        <Card key={game.id} game={game} />
      ))}
    </div>
  );
};

export default Home;