import { useEffect, useState } from "react";

const GenreSelector = ({ setGenre }) => {
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch('http://localhost:3001/genres');
        const data = await res.json();
        console.log(data)
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres: ", error);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  return (
    <div className="genre-selector" style={{marginLeft: "10px", marginBottom: "10px",}}>
      <select onChange={handleGenreChange}>
        <option value="">Todos os gêneros</option>
        {genres && genres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelector;
