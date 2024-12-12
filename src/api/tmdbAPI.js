// tmdbAPI.js
const TMDB_API_KEY = "4d35d05ba9fbcd0b19abdb963b0bff58"; // SUA CHAVE DA API
const API_BASE_URL = "https://api.themoviedb.org/3";

//Função para pegar as configurações da API, incluindo o base url das imagens
const getAPIConfig = async () =>{
    try {
        const response = await fetch(`${API_BASE_URL}/configuration?api_key=${TMDB_API_KEY}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar configuração da API do TMDB: ${response.status} - ${await response.text()}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao obter configurações da API", error);
        throw error;
    }
}

export const fetchMoviesFromTMDB = async (movieId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=pt-BR`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados do TMDB (Filme ID: ${movieId}): ${response.status} - ${await response.text()}`);
        }

        const data = await response.json();

         //Obtem as configurações da API
        const config = await getAPIConfig();

        //adiciona a url completa da imagem no objeto data
        if(config?.images?.secure_base_url && data?.poster_path){
            data.full_poster_path = `${config.images.secure_base_url}w500${data.poster_path}`;
        }

        return data;
    } catch (error) {
        console.error('Erro em fetchMoviesFromTMDB:', error.message);
        throw error; // Re-lança o erro para ser tratado no componente
    }
};

//Função para buscar informações de séries (usada no featuredMovie caso o filme aleatório seja uma série)
export const fetchTVFromTMDB = async (tvId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tv/${tvId}?api_key=${TMDB_API_KEY}&language=pt-BR`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados do TMDB (TV ID: ${tvId}): ${response.status} - ${await response.text()}`);
        }

        const data = await response.json();
        //Obtem as configurações da API
        const config = await getAPIConfig();

        //adiciona a url completa da imagem no objeto data
        if(config?.images?.secure_base_url && data?.poster_path){
            data.full_poster_path = `${config.images.secure_base_url}w500${data.poster_path}`;
        }
        return data;
    } catch (error) {
        console.error('Erro em fetchTVFromTMDB:', error.message);
        throw error; // Re-lança o erro para ser tratado no componente
    }
}