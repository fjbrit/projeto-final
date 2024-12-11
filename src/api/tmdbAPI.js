// tmdbAPI.js
export const fetchMoviesFromTMDB = async (movieId) => {
    const TMDB_API_URL = `https://api.themoviedb.org/3/movie/${500}?language=pt-BR`;
    const TMDB_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDM1ZDA1YmE5ZmJjZDBiMTlhYmRiOTYzYjBiZmY1OCIsIm5iZiI6MTczMzM1MTM5OS40MjgsInN1YiI6IjY3NTBkN2U3OWVjODE2NzYyOWQ2YTJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vFGDtjhmoKMzBaUUcH8g0SEMkZCl19hyNakpQQvKeYE';
  
    try {
      const response = await fetch(TMDB_API_URL, {
        method: 'GET',
        headers: {
          Authorization: TMDB_API_KEY,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do TMDB');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados do TMDB:', error.message);
      throw error;
    }
  };
  