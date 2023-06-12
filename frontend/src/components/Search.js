import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.js";
import GenreSelector from "../components/GenreSelector.js";
import "./search.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [allMovies, setAllMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [lastQuery, setLastQuery] = useState("");
  const [genre, setGenre] = useState("");
  const query = searchParams.get("q") || "";

  const getSearchedMovies = async (query, genre, page) => {
    let url;
    if (query === "") {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=fe18cce4d03cc82286fd6baf4e1c067a&page=${page}`;
    } else if (genre !== "") {
      url = `http://localhost:3001/genres/${genre}/movies?page=${page}`;
    } else {
      url = `http://localhost:3001/search?q=${query}&page=${page}`;
    }
    try {
      const res = await fetch(url);
      const data = await res.json();
      let newMovies;
      if (Array.isArray(data)) {
        newMovies = data;
      } else if (data.results) {
        newMovies = data.results;
      } else {
        newMovies = [data];
      }

      setAllMovies((oldMovies) => [...oldMovies, ...newMovies]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const checkScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((oldPage) => oldPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    if (lastQuery !== query || lastQuery !== genre) {
      setAllMovies([]);
      setPage(1);
      setLastQuery(query);
    }
  }, [query, genre]);

  useEffect(() => {
    getSearchedMovies(query, genre, page);
  }, [query, genre, page, lastQuery]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <GenreSelector setGenre={setGenre} />
      <div className="movies-container">
        {allMovies.length > 0 &&
          allMovies.map((movie, index) => (
            <MovieCard key={movie.id + index} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Search;
