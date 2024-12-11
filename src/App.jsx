import React, { useEffect, useState } from 'react';
import './styles/global.css';
import FeaturedMovie from './Components/FeaturedMovie';
import MovieGrid from './Components/MovieGrid';
import { fetchMoviesFromFirstAPI } from './api/firstAPI';
import { fetchMoviesFromTMDB } from './api/tmdbAPI';
import './App.css';

const FIRST_API_URL = 'https://ecom-back-strapi.onrender.com/api/movies/';
const FIRST_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzOTUwNjk0LCJleHAiOjE3MzY1NDI2OTR9.Z3LEFzanh39ZxRE0YQ1Pawcc6izA_C5mwZlAW3YrozI';
const TMDB_API_URL = 'https://api.themoviedb.org/3/movie/${500}?language=pt-BR`';
const TMDB_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDM1ZDA1YmE5ZmJjZDBiMTlhYmRiOTYzYjBiZmY1OCIsIm5iZiI6MTczMzM1MTM5OS40MjgsInN1YiI6IjY3NTBkN2U3OWVjODE2NzYyOWQ2YTJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vFGDtjhmoKMzBaUUcH8g0SEMkZCl19hyNakpQQvKeYE';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log('Carregando dados do filme em destaque...');
        const tmdbFeaturedData = await fetchMoviesFromTMDB(TMDB_API_URL, TMDB_API_KEY);
        console.log('Dados do TMDB:', tmdbFeaturedData);

        const featuredMovieData = {
          id: tmdbFeaturedData.id,
          title: tmdbFeaturedData.title,
          overview: tmdbFeaturedData.overview,
          poster_path: tmdbFeaturedData.poster_path,
          vote_average: tmdbFeaturedData.vote_average,
        };
        setFeaturedMovie(featuredMovieData);

        console.log('Carregando filmes da primeira API...');
        const firstAPIData = await fetchMoviesFromFirstAPI(FIRST_API_URL, FIRST_API_KEY);
        console.log('Dados da primeira API:', firstAPIData);

        // Verificação adicional para garantir que os dados sejam um array
        if (firstAPIData && firstAPIData.data && Array.isArray(firstAPIData.data)) {
          const firstAPIMovies = firstAPIData.data.map((movie) => ({
            id: movie.id,
            title: movie.attributes.title,
            overview: movie.attributes.description,
            poster_path: movie.attributes.poster,
            vote_average: movie.attributes.rating,
          }));

          setMovies(firstAPIMovies);
        } else {
          console.warn('Dados da primeira API estão vazios ou em formato incorreto');
          setMovies([]); // Garante que seja um array vazio
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Erro durante a carga dos dados:', err.message);
        setError('Houve um problema ao carregar os filmes. Tente novamente mais tarde.');
        setMovies([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>CAMPINHO FLIX</h1>
      </header>
      
      {error && <p className="error-message">{error}</p>}
      
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {featuredMovie ? (
            <FeaturedMovie movie={featuredMovie} />
          ) : (
            <p>Nenhum filme em destaque disponível</p>
          )}
          
          <section>
            <h2>Filmes</h2>
            {movies.length > 0 ? (
              <MovieGrid movies={movies} />
            ) : (
              <p>Nenhum filme encontrado</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default App;