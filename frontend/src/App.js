import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieDetailsPage from "./MovieDetailsPage.js";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Home from "./Home.js";
import Footer from "./components/Footer";

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
      <Navbar />
      <Container fluid style={{ minHeight: "100vh" }}>
        <Routes>
        <Route path="/" element={<Home featuredMovie={featuredMovie} featuredMovieImageUrl={featuredMovieImageUrl} topRatedMovies={topRatedMovies} nowPlayingMovies={nowPlayingMovies} />} />
          />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer /> {/* Adicione o Footer aqui */}
      </Container>
    </Router>
  );
};

export default App;
