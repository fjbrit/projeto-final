import React from 'react';
import Card from './Card';


const MovieGrid = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p>Nenhum filme disponível no momento.</p>;
  }

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
