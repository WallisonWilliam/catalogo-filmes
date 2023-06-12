import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import MovieCard from "./components/MovieCard";
import ImageL from "./imagens/L.png";
import Image10 from "./imagens/10.png";
import Image12 from "./imagens/12.png";
import Image14 from "./imagens/14.png";
import Image16 from "./imagens/16.png";
import Image18 from "./imagens/18.png";
import moviesearch from "./imagens/moviesearch.png";


function Home({featuredMovie, featuredMovieImageUrl, topRatedMovies, nowPlayingMovies}) {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 9,
      slidesToScroll: 5,
      arrows: window.innerWidth > 480, // Mostra setas somente se a largura da janela for maior que 480px
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: true, // Sempre mostra setas na visualização de desktop
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false, // Nunca mostra setas na visualização mobile
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false, // Nunca mostra setas na visualização mobile
          },
        },
      ],
    };
    

    const getCertificationImage = (certification) => {
      switch (certification) {
        case "L":
          return ImageL;
        case "10":
          return Image10;
        case "12":
          return Image12;
        case "14":
          return Image14;
        case "16":
          return Image16;
        case "18":
          return Image18;
        // Adicione outros cases conforme necessário para mapear os valores de certification para as imagens correspondentes
        default:
          return null; // Retorne uma imagem padrão ou null caso o valor de certification não corresponda a uma imagem específica
      }
    };

    const formatRuntime = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}min`;
    };

    return (
      <>
        <div className="web">            
          <div style={{ display: "flex", alignItems: "center",marginRight: "1rem",}}>
            <Link to="/" className="web-only-button">
              <img
                src={moviesearch}
                alt="Logo do site"
                style={{ width: "10rem", padding: "1rem 0px" }}
              />
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "1rem",
            }}
          >
            <Link to="/search" className="web-only-button">
              Movies
            </Link>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <img
            id="imagem-principal"
            src={featuredMovieImageUrl}
            alt={featuredMovie?.title}
            style={{
              width: "100%",
              objectFit: "cover",
              objectPosition: "50% 20%",
            }}
          />

          <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
            <h1 style={{ color: "#FFF" }}>{featuredMovie?.title}</h1>
            <p className="details">
              {new Date(featuredMovie?.release_date).getFullYear()}{" "}
              <img
                src={getCertificationImage(featuredMovie?.certification)}
                alt={featuredMovie?.certification}
              />{" "}
              {/*formatRuntime(featuredMovie.runtime)*/}
            </p>
            <p>{/*<StarRating rating={featuredMovie?.vote_average / 2} />*/}</p>

            <Link to={`/movie/${featuredMovie?.id}`}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_55_14)">
                  <path
                    d="M16.875 21.5625H15.9375V13.1831C15.9375 13.1728 15.9347 13.1634 15.9347 13.1541C15.9347 13.1447 15.9375 13.1353 15.9375 13.125C15.9375 12.6075 15.5175 12.1875 15 12.1875H13.125C12.6075 12.1875 12.1875 12.6075 12.1875 13.125C12.1875 13.6425 12.6075 14.0625 13.125 14.0625H14.0625V21.5625H13.125C12.6075 21.5625 12.1875 21.9825 12.1875 22.5C12.1875 23.0175 12.6075 23.4375 13.125 23.4375H16.875C17.3925 23.4375 17.8125 23.0175 17.8125 22.5C17.8125 21.9825 17.3925 21.5625 16.875 21.5625ZM15 10.3125C16.0359 10.3125 16.875 9.4725 16.875 8.4375C16.875 7.4025 16.0359 6.5625 15 6.5625C13.9641 6.5625 13.125 7.4025 13.125 8.4375C13.125 9.4725 13.965 10.3125 15 10.3125ZM15 0C6.71625 0 0 6.71531 0 15C0 23.2847 6.71531 30 15 30C23.2847 30 30 23.2847 30 15C30 6.71531 23.2847 0 15 0ZM15 28.1541C7.7625 28.1541 1.875 22.2366 1.875 14.9991C1.875 7.76156 7.7625 1.87406 15 1.87406C22.2375 1.87406 28.125 7.76156 28.125 14.9991C28.125 22.2366 22.2375 28.1541 15 28.1541Z"
                    fill="url(#paint0_linear_55_14)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_55_14"
                    x1="-1.94118"
                    y1="24.6426"
                    x2="35.6847"
                    y2="-3.09373"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FC6076" />
                    <stop offset="1" stopColor="#FF9A44" />
                  </linearGradient>
                  <clipPath id="clip0_55_14">
                    <rect width="30" height="30" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
        </div>

        <h2 className="mt-4">Top Hits Movies</h2>
        <Slider {...settings}>
          {topRatedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Slider>

        <h2 className="mt-4">Now Playing Movies</h2>
        <Slider {...settings}>
          {nowPlayingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Slider>
      </>
    );
  }

  export default Home;