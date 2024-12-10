// src/components/Card.jsx

import React from 'react';

const Card = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path.startsWith('http')
            ? movie.poster_path
            : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
        alt={`${movie.title} Poster`}
        className="movie-poster"
      />
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
      {movie.vote_average && <p><strong>Avaliação:</strong> {movie.vote_average}</p>}
    </div>
  );
};

export default Card;
