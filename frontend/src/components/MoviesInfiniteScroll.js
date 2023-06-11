import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from './MovieCard';

const MoviesInfiniteScroll = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState(null);

  const fetchMovies = async () => {
    let url = `http://localhost:3001/movies/popular?page=${page}`;
    if (category) {
      url = `http://localhost:3001/genres/${category}/movies?page=${page}`;
    }
    const response = await axios.get(url);
    if (response.data.length === 0) {
      setHasMore(false);
      return;
    }
    setMovies((prevMovies) => [...prevMovies, ...response.data]);
    setPage((prevPage) => prevPage + 1);
  };

  const handleCategoryClick = (categoryId) => {
    setCategory(categoryId);
    setMovies([]);
    setPage(1);
    setHasMore(true);
  };

  useEffect(() => {
    fetchMovies();
  }, [category]);

  return (
    <div>
      <div>
        <button onClick={() => handleCategoryClick(null)}>Todos</button>
        <button onClick={() => handleCategoryClick(28)}>Ação</button>
        <button onClick={() => handleCategoryClick(12)}>Aventura</button>
        <button onClick={() => handleCategoryClick(16)}>Animação</button>
        {/* Adicione mais botões para outras categorias aqui */}
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMovies}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default MoviesInfiniteScroll;
