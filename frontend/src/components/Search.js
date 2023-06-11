import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.js";
import './search.css';



const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (query) => {
    try {
      const res = await fetch(`http://localhost:3001/search?q=${query}`);
      const data = await res.json();
      setMovies(data);
      console.log(data); // Verifique se a resposta está sendo recebida corretamente.
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  ;

  useEffect(() => {
    getSearchedMovies(query);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {console.log(movies)} {/* Verifique se o estado dos filmes está sendo atualizado corretamente. */}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
  
};

export default Search;
