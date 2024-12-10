// src/App.jsx

import React, { useEffect, useState } from 'react';
import './styles/global.css';
import Card from './Components/Card';
import { fetchMoviesFromFirstAPI, fetchMoviesFromTMDB } from './api/api';

const FIRST_API_URL = 'https://ecom-back-strapi.onrender.com/api/movies';
const FIRST_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzNTE4NDIyLCJleHAiOjE3MzYxMTA0MjJ9.v8q1AxJgVkZur8YxzdIA3rDvy5pk0VjixPcDTMofJD8';
const TMDB_API_URL = 'https://api.themoviedb.org/3/movie/500';
const TMDB_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDM1ZDA1YmE5ZmJjZDBiMTlhYmRiOTYzYjBiZmY1OCIsIm5iZiI6MTczMzM1MTM5OS40MjgsInN1YiI6IjY3NTBkN2U3OWVjODE2NzYyOWQ2YTJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vFGDtjhmoKMzBaUUcH8g0SEMkZCl19hyNakpQQvKeYE';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const firstAPIData = await fetchMoviesFromFirstAPI(FIRST_API_URL, FIRST_API_KEY);
        const tmdbData = await fetchMoviesFromTMDB(TMDB_API_URL, TMDB_API_KEY);

        setMovies([
          ...firstAPIData.data.map((movie) => ({
            id: movie.id,
            title: movie.attributes.title,
            overview: movie.attributes.description,
            poster_path: movie.attributes.poster,
            vote_average: movie.attributes.rating,
          })),
          {
            id: tmdbData.id,
            title: tmdbData.title,
            overview: tmdbData.overview,
            poster_path: tmdbData.poster_path,
            vote_average: tmdbData.vote_average,
          },
        ]);
        setFeaturedMovie(tmdbData);
      } catch (error) {
        setError('Houve um problema ao carregar os filmes.');
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>CAMPINHO FLIX</h1>
      </header>
      {error && <p className="error-message">{error}</p>}
      {featuredMovie && (
        <div className="featured-movie">
          <h2>Filme em Destaque: {featuredMovie.title}</h2>
          <p>{featuredMovie.overview}</p>
        </div>
      )}
      <section>
        <h2>Filmes</h2>
        <div className="movies-grid">
          {movies.length === 0 ? (
            <p>Carregando filmes...</p>
          ) : (
            movies.map((movie) => <Card key={movie.id} movie={movie} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
