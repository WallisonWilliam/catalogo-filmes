import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.js";
import GenreSelector from "../components/GenreSelector.js";
import './search.css';


const Search = () => {
  const [searchParams] = useSearchParams();
  const [allMovies, setAllMovies] = useState([]); // Adicione isso
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState('');
  const query = searchParams.get("q") || '';

  const getSearchedMovies = async (query, genre, page) => {
    let url;
    if (query === '') {
        url = `http://localhost:3001/featured`;
    } else if (genre !== '') {
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

        // Filtrar novos filmes para excluir aqueles que já existem em allMovies
        const filteredMovies = newMovies.filter(
            newMovie => !allMovies.some(existingMovie => existingMovie.id === newMovie.id)
        );

        setAllMovies(oldMovies => [...oldMovies, ...filteredMovies]);
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};


  const checkScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage(oldPage => oldPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  useEffect(() => {
    getSearchedMovies(query, genre, page);
  }, [query, genre, page]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <GenreSelector setGenre={setGenre} />
      <div className="movies-container">
        {allMovies.length > 0 &&
          allMovies.map((movie, index) => <MovieCard key={movie.id + index} movie={movie} />)
        }
      </div>
    </div>
  );
};

export default Search;
