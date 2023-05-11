import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Erro ao buscar o filme em destaque:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Carregando...</div>;
  }

  return (
    <div
      className="movie-details"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="movie-details-content">
        <h1 className="movie-details-title">
          {movie.title}
        </h1>
        <p className="movie-details-info">
          Classificação indicativa: {movie.adult ? '18+' : 'Livre'}
        </p>
        <p className="movie-details-info">
          Duração: {movie.runtime} minutos
        </p>
        <p className="movie-details-info">
          Avaliação: {movie.vote_average}
        </p>
      </div>
    </div>
  );
}

export default MovieDetails;
