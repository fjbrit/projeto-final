import React, { useState, useEffect } from 'react';
import './styles/global.css';
import FeaturedMovie from './Components/FeaturedMovie';
import MovieGrid from './Components/MovieGrid';
import { fetchMoviesFromFirstAPI } from './api/firstAPI';
import { fetchMoviesFromTMDB } from './api/tmdbAPI';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar filmes da primeira API
        const firstAPIData = await fetchMoviesFromFirstAPI();
        const firstAPIMovies = firstAPIData.data.map((movie) => ({
          id: movie.id,
          title: movie.attributes.title,
          overview: movie.attributes.description,
          poster_path: movie.attributes.poster,
          vote_average: movie.attributes.rating,
        }));
        setMovies(firstAPIMovies);

        // Selecionar um filme aleatório
        if (firstAPIMovies.length > 0) { 
          const randomIndex = Math.floor(Math.random() * firstAPIMovies.length);
          const randomMovieId = firstAPIMovies[randomIndex].id;

          // Buscar detalhes do filme aleatório no TMDB
          const tmdbFeaturedData = await fetchMoviesFromTMDB(randomMovieId); 
          setFeaturedMovie(tmdbFeaturedData); 
        } else {
          console.warn("Nenhum filme encontrado na primeira API.");
        }

      } catch (err) {
        console.error('Erro ao carregar os dados:', err.message);
        setError('Houve um problema ao carregar os filmes.');
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="loading">Carregando...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="App">
      <header>
        <h1>CAMPINHO FLIX</h1>
      </header>
      {featuredMovie && <FeaturedMovie movie={featuredMovie} />} 
      <section>
        <h2>Filmes</h2>
        <MovieGrid movies={movies} /> 
      </section>
    </div>
  );
};

export default App;