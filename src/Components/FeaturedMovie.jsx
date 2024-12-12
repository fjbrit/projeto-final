import React, { useState, useEffect } from 'react';
import './FeaturedMovie.css';

const FeaturedMovie = ({ movie }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=4d35d05ba9fbcd0b19abdb963b0bff58`);
                if (!response.ok) {
                    throw new Error(`Erro ao obter configuração: ${response.status}`);
                }
                const config = await response.json();
                if (movie.backdrop_path) { 
                    setImageUrl(`${config.images.secure_base_url}original${movie.backdrop_path}`);
                    console.log(`URL da imagem: ${imageUrl}`); // Verifique a URL no console
                } else {
                    console.warn("Filme sem backdrop_path:", movie);
                }
            } catch (error) {
                console.error('Erro ao obter configuração da API:', error);
            }
        };

        if (movie) {
            fetchConfig();
        }

    }, [movie]);

    return (
        <section className="featured-movie" style={{ backgroundImage: `url(${imageUrl})` }}> 
            {/* Resto do seu código */}
            {/* Adicionamos uma imagem placeholder caso a URL da imagem não esteja disponível */}
        </section>
    );
};

export default FeaturedMovie;