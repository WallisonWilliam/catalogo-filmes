import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/150'; // um placeholder para filmes sem imagem

  return (
    <div style={{margin: "0 10px",borderRadius: "10px",overflow: "hidden",height: "100",}}>
      <Link to={`/movie/${movie.id}`}>
        <img         
          src={imageUrl}
          alt={movie.title}
          style={{ width: "100%", height: "auto" }}
        />
      </Link>
    </div>
  );
};

export default MovieCard;
