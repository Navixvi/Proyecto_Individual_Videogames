import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { connect } from 'react-redux';
import { setPage } from '../redux/action';
import NavBar from '../components/NavBar';

const mapStateToProps = (state) => ({
  currentPage: state.pagination.currentPage,
  totalPages: state.pagination.totalPages,
});

const Home = ({ currentPage, totalPages, setPage }) => {
  const [videoGames, setVideoGames] = useState([]);
  const [sortBy, setSortBy] = useState('asc'); 
  useEffect(() => {
    const loadVideoGames = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/page/:page`, {
          params: {
            page: currentPage,
          },
        });
        console.log("Respuesta del servidor:", response.data);
        setVideoGames(response.data.videogames);
      } catch (error) {
        console.error('Error al obtener videojuegos:', error);
      }
    };

    loadVideoGames();
  }, [currentPage]);

  const handleSort = (type) => {
    setSortBy(type);
  };

  const sortedGames = [...videoGames].sort((a, b) => {
    if (sortBy === 'asc') {
      return a.name.localeCompare(b.name); // Ordena de la A a la Z
    } else {
      return b.name.localeCompare(a.name); // Ordena de la Z a la A
    }
  });

  const nextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  return (
    <div className='home'>
      <NavBar currentPage={currentPage} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} handleSort={handleSort} />
      <h1 className='home-title'>Videogames Henry</h1>
      <div className="card-list">
        {sortedGames.map((game) => (
          <Card key={game.id} game={game} sortBy={sortBy} />
        ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, { setPage })(Home);