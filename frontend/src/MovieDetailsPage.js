import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "./MovieDetailsPage.css";
import ImageL from "./imagens/L.png";
import Image10 from "./imagens/10.png";
import Image12 from "./imagens/12.png";
import Image14 from "./imagens/14.png";
import Image16 from "./imagens/16.png";
import Image18 from "./imagens/18.png";


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
              append_to_response: "release_dates,watch/providers,images,credits",
            },
          }
        );
        const releaseDates = response.data.release_dates.results;
        const brReleaseDates = releaseDates.find(country => country.iso_3166_1 === 'BR');
        const certification = brReleaseDates?.release_dates[0]?.certification;
        response.data.certification = certification;
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

  const cast = movieDetails?.credits?.cast || [];
  const principalCast = cast.slice(0, 6); // Limita para os 6 primeiros atores
  const castNames = principalCast.map((actor) => actor.name); // Obtém apenas os nomes dos atores
  const castList = castNames.join(", "); // Concatena os nomes com uma vírgula entre eles

  // Função para formatar a duração em horas e minutos
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  const getCertificationImage = (certification) => {
    switch (certification) {
      case 'L':
        return ImageL;
      case '10':
        return Image10;
      case '12':
        return Image12;
      case '14':
        return Image14;
      case '16':
        return Image16;
      case '18':
        return Image18;
      // Adicione outros cases conforme necessário para mapear os valores de certification para as imagens correspondentes
      default:
        return null; // Retorne uma imagem padrão ou null caso o valor de certification não corresponda a uma imagem específica
    }
  };

  return (
    
    <Container fluid>
    <div className="movie-image" style={{ width: "100%" }}>
      {movieDetails.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
          alt={`Pôster de ${movieDetails.title}`}
          style={{ width: "100%" }}
        />
        )}
      </div>
      <div className="movie-details">
        <h1>{movieDetails.title}</h1>
        <p className="details">
          {new Date(movieDetails.release_date).getFullYear()}{" "}
          <img
          src={getCertificationImage(movieDetails.certification)}
          alt={movieDetails.certification}
          />{" "}
          {formatRuntime(movieDetails.runtime)}
        </p>

        <p>
          <StarRating rating={movieDetails.vote_average / 2} />
        </p>
        <h2>Sinopse</h2>
        <p>{movieDetails.overview}</p>
        <h2>Elenco</h2>
        <p>{castList}</p>
      
      {streamingProviders.length > 0 && (
        <div>
          <h2>Disponível em:</h2>
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
      </div>
    </Container>
    
  );
}

function StarRating({ rating }) {
  // Calcula o número de estrelas inteiras, meias estrelas e estrelas vazias
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  // Gera os arrays com as estrelas
  const fullStarsArray = Array(fullStars).fill(<i className="fa fa-star"></i>); // estrela cheia
  const halfStarsArray = halfStars
    ? [<i className="fa fa-star-half-o"></i>]
    : []; // meia estrela
  const emptyStarsArray = Array(emptyStars).fill(
    <i className="fa fa-star-o"></i>
  ); // estrela vazia

  // Junta tudo em um único array
  const starsArray = [...fullStarsArray, ...halfStarsArray, ...emptyStarsArray];

  // Formata a nota para uma casa decimal
  const formattedRating = (rating * 1.94).toFixed(1);

  // Retorna as estrelas como um componente
  return (
    <div className="star-rating">
      <div className="stars">
        {starsArray.map((star, index) => (
          <span key={index} className="star">
            {star}
          </span>
        ))}
      </div>
      <span className="rating">{formattedRating}/10</span>
      <style>{`
        .star-rating {
          display: flex;
          align-items: center;
        }
        
        .stars {
          display: flex;
          margin-right: 5px;
        }
        
        .star {
          background: linear-gradient(53.6deg, #FC6076 3.85%, #FF9A44 115.28%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .rating {
          font-weight: bold;
          font-family: 'Exo 2', sans-serif;
          letter-spacing: 0.02em;
          color: #838383;
        }
      `}</style>
    </div>
  );
}

export default MovieDetailsPage;
