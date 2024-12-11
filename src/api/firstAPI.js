// firstAPI.js
export const fetchMoviesFromFirstAPI = async () => {
  const FIRST_API_URL = 'https://ecom-back-strapi.onrender.com/api/movies';
  const FIRST_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzNTE4NDIyLCJleHAiOjE3MzYxMTA0MjJ9.v8q1AxJgVkZur8YxzdIA3rDvy5pk0VjixPcDTMofJD8';

  try {
    const response = await fetch(FIRST_API_URL, {
      method: 'GET',
      headers: {
        Authorization: FIRST_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar dados da primeira API');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os filmes:', error.message);
    throw error;
  }
};

