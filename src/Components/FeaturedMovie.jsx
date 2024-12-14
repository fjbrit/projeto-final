import React from 'react';
import './FeaturedMovie.css';

const FeaturedMovie = ({ movie }) => {
  if (!movie || !movie.backdrop_path) {
    return <div className="featured-movie no-poster">Imagem não disponível</div>;
  }

  const backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;

  return (
    <section className="featured-movie" style={{ backgroundImage }}>
      <div className="featured-movie__overlay"> {/* Div para o degradê */}
        <div className="featured-movie-info">
          <h2 className="featured-movie-title">{movie.title}</h2>
          {movie.genres && (
            <div className="featured-movie-details">
              {movie.genres.map(genre => (
                <div className="detail" key={genre.id}>
                  {genre.name}
                </div>
              ))}
            </div>
          )}
          <p className="featured-movie-overview">{movie.overview}</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovie;