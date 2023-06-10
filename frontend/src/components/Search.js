import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "C:/Users/Wallison/Documents/GitHub/catalogo-filmes/frontend/src/components/MovieCard.js";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  useEffect(() => {
    const searchWithQueryURL = `${backendURL}/search?term=${query}`;
    getSearchedMovies(searchWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Search;
