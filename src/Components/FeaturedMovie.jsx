import React from 'react';
import './FeaturedMovie.css';

const FeaturedMovie = ({ movie }) => {
  if (!movie) return null;

  return (
    <div
      className="featured-movie"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(${movie.poster_path})`,
      }}
    >
      <div className="featured-content">
        <h1 className="featured-title">{movie.title}</h1>
        <p className="featured-overview">{movie.overview}</p>
        <span className="featured-rating">⭐ {movie.vote_average.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default FeaturedMovie;
