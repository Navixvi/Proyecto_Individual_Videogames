import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/action';

const mapStateToProps = (state) => ({
  currentPage: state.pagination.currentPage,
  totalPages: state.pagination.totalPages,
});

const Home = ({ currentPage, totalPages, setPage }) => {
  const [videoGames, setVideoGames] = useState([]);



  useEffect(() => {
    const loadVideoGames = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/videogames`, {
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
      console.log(currentPage);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
      console.log(currentPage);
    }
  };

  return (
    <div className='home'>
      <h1 className='home-tittle'>Videogames Henry</h1>
      <div className="card-list">
        {videoGames.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, { setPage })(Home);

