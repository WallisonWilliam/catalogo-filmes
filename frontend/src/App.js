import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieDetailsPage from "./MovieDetailsPage.js";

const MovieCard = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Col xs={6} sm={4} md={3} lg={2}>
      <Card className="mb-4 rounded" style={{ border: "none" }}>
        <Link to={`/movie/${movie.id}`}>
          <Card.Img variant="top" src={imageUrl} />
        </Link>
      </Card>
    </Col>
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

  function Home() {
    return (
      <>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={featuredMovieImageUrl}
              alt={featuredMovie?.title}
            />
            <Carousel.Caption>
              <h3>{featuredMovie?.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <h2 className="mt-4">Top Hits Movies</h2>
        <Row className="Filmes d-flex flex-wrap">
          {topRatedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Row>
        <h2 className="mt-4">Em cartaz</h2>
        <Row className="d-flex flex-wrap">
          {nowPlayingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Row>
      </>
    );
  }
};

export default App;
