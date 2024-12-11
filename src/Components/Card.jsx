import React from 'react';
import './Card.css';

const Card = ({ movie }) => {
  if (!movie || !movie.poster_path) {
    return <div className="card-error">Informações indisponíveis</div>;
  }

  return (
    <div className="card">
      <img
        src={movie.poster_path.startsWith('http') 
          ? movie.poster_path 
          : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} Poster`}
        className="card-poster"
      />
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
    </div>
  );
};

export default Card;
