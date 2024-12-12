import React, { useEffect, useState } from 'react';

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null); // Declaração da variável 'error'

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://ecom-back-strapi.onrender.com/api/movies', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzNTE4NDIyLCJleHAiOjE3MzYxMTA0MjJ9.v8q1AxJgVkZur8YxzdIA3rDvy5pk0VjixPcDTMofJD8',
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setMovies(data.data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar filmes. Tente novamente mais tarde.'); 
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-grid">
      {error && <p className="error-message">{error}</p>} 
      {movies.length > 0 ? (
        <> 
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-image-container">
                <img
                  className="movie-image"
                  src={movie.attributes.poster}
                  alt={movie.attributes.title}
                  loading="lazy"
                />
              </div>
              <p className="movie-title">{movie.attributes.title}</p>
              {movie.attributes.rating && <span className="rating">{movie.attributes.rating}</span>}
            </div>
          ))}
        </>
      ) : (
        !error && <p className="loading">Carregando filmes...</p>
      )}
    </div>
  );
};

export default MovieGrid;