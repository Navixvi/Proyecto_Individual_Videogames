import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Detail = () => {
  const [gameDetails, setGameDetails] = useState({});
  const { id } = useParams(); 
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        // Determina si 'id' es un UUID o un número
        const isUUID = id.match(/^[0-9a-fA-F-]{36}$/); // Verifica si 'id' es un UUID válido

        let response;
        if (isUUID) {
          // Si es un UUID, realiza la solicitud GET por UUID
          console.log(isUUID);
          response = await axios.get(`http://localhost:3001/videogames/by-uuid/${id}`);
        } else {
          console.log(isUUID);
          // Si es un número, realiza la solicitud GET por ID numérico
          response = await axios.get(`http://localhost:3001/videogames/${id}`);
        }

        setGameDetails(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del juego:', error);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (!gameDetails || !gameDetails.id) {
    return <div>Cargando...</div>;
  }
  

  const renderDescription = () => {
    return { __html: gameDetails.description };
  };

  return (
    <div className="detail-container">
      <div className="detail-content">
        <img src={gameDetails.background_image} alt={gameDetails.name} />
        <div className="game-info">
          <h3>{gameDetails.name}</h3>
          <p>ID: {gameDetails.id}</p>
          <div>
            <p>Descripción:</p>
            <div dangerouslySetInnerHTML={renderDescription()} />
          </div>
          <p>Plataforma: {Array.isArray(gameDetails.platforms) && gameDetails.platforms.length > 0 ? gameDetails.platforms.map(platform => typeof platform === 'object' ? platform.platform.name : platform).join(', ') : 'Plataforma no disponible'}</p>
          <p>Fecha de Lanzamiento: {gameDetails.released || gameDetails.releaseDate ||  'Fecha de lanzamiento no disponible'}</p>
          <p>Calificación: {gameDetails.rating || 'Calificación no disponible'}</p>
          <p>Géneros: {gameDetails.genres && gameDetails.genres.length > 0 ? gameDetails.genres.map(genre => genre.name).join(', ') : 'Géneros no disponibles'}</p>
          <Link to="/home" className="link-volver-atras">Volver atrás</Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;




