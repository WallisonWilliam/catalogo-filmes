import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import MovieDetailsPage from "./MovieDetailsPage.js";

const MovieCard = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div style={{ margin: "0 10px", borderRadius: "10px", overflow: "hidden" }}>
      <Link to={`/movie/${movie.id}`}>
        <img src={imageUrl} alt={movie.title} style={{ width: "100%", height: "auto" }} />
      </Link>
    </div>
  );
};

const App = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      const response = await axios.get("http://localhost:3001/featured");
      setFeaturedMovie(response.data);
    };

    const fetchTopRatedMovies = async () => {
      const response = await axios.get(
        "http://localhost:3001/movies/top-rated"
      );
      setTopRatedMovies(response.data);
    };

    const fetchNowPlayingMovies = async () => {
      const response = await axios.get(
        "http://localhost:3001/movies/now-playing"
      );
      setNowPlayingMovies(response.data);
    };

    fetchFeaturedMovie();
    fetchTopRatedMovies();
    fetchNowPlayingMovies();
  }, []);

  const featuredMovieImageUrl = featuredMovie
    ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
    : "";

    function Home() {
      var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: window.innerWidth > 480, // Mostra setas somente se a largura da janela for maior que 480px
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              arrows: true // Sempre mostra setas na visualização de desktop
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              arrows: false // Nunca mostra setas na visualização mobile
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              arrows: false // Nunca mostra setas na visualização mobile
            }
          }
        ]
      };
  

    return (
      <>
        <div style={{ position: "relative" }}>
          <img
            src={featuredMovieImageUrl}
            alt={featuredMovie?.title}
            style={{ width: "100%" }}
          />
          <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
            <h1 style={{ color: "#FFF" }}>{featuredMovie?.title}</h1>
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

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
