import axios from 'axios';

// Função para buscar filmes da primeira API
export const fetchMoviesFromFirstAPI = async (url, apiKey) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: apiKey,
      },
    });
    return response.data;  // Retorna os dados da API
  } catch (error) {
    console.error('Erro ao buscar filmes da primeira API:', error);
    throw new Error('Não foi possível carregar os filmes da primeira API.');
  }
};

// Função para buscar filmes da TMDB
export const fetchMoviesFromTMDB = async (url, apiKey) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: apiKey,
      },
    });
    return response.data;  // Retorna os dados da TMDB
  } catch (error) {
    console.error('Erro ao buscar filmes da TMDB:', error);
    throw new Error('Não foi possível carregar os filmes da TMDB.');
  }
};
