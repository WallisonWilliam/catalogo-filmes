import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: apiKey,
              language: "pt-BR",
              append_to_response: "watch/providers,images",
            },
          }
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Carregando...</div>;
  }

  // Função para obter a imagem do provedor de streaming
  const getProviderLogo = (provider) => {
    return `https://image.tmdb.org/t/p/w45${provider.logo_path}`;
  };

  // Função para gerar o link de redirecionamento do JustWatch
  const generateJustWatchLink = (movieTitle) => {
    return `https://www.justwatch.com/br/busca?q=${encodeURIComponent(
      movieTitle
    )}`;
  };

  const streamingProviders =
    movieDetails["watch/providers"]?.results?.BR?.flatrate || [];

  return (
    <Container>
      <h1>{movieDetails.title}</h1>
      {movieDetails.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
          alt={`Pôster de ${movieDetails.title}`}
        />
      )}
      <p>Data de lançamento: {movieDetails.release_date}</p>
      <p>Avaliação: {movieDetails.vote_average}</p>
      <p>{movieDetails.overview}</p>
      {streamingProviders.length > 0 && (
        <div>
          <h2>Serviços de streaming disponíveis:</h2>
          <Row>
            {streamingProviders.map((provider) => (
              <Col key={provider.provider_id} xs="auto">
                <a
                  href={generateJustWatchLink(movieDetails.title)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                    alt={`Logo do ${provider.provider_name}`}
                    style={{ borderRadius: "8px" }}
                  />
                </a>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
}

export default MovieDetailsPage;
