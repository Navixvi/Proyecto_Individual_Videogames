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
      <NavBar currentPage={currentPage} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} />
      <h1 className='home-title'>Videogames Henry</h1>
      <div className="card-list">
      {videoGames.map((game) => (
      <Card key={game.id} game={game} />
      ))}
    </div>
    </div>
  );
};

export default connect(mapStateToProps, { setPage })(Home);
