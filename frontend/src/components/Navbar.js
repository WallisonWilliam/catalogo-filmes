import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";
import moviesearch from "../imagens/moviesearch.png";

import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const isSearchPage = location.pathname.includes("/search");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

      navigate(`/search?q=${search}`, { replace: true });
      setSearch("");
    };

    return (
      <nav id="navbar" style={{ display: isSearchPage ? "flex" : "none" }}>
        <h2>
          <Link to="/">
            <img src={moviesearch} alt="Logo do site" style={{ width: "100%" }} />
          </Link>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Busque um filme"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button type="submit" id="search-submit-button">
            <BiSearchAlt2 />
          </button>
        </form>
      </nav>
    );
};

export default Navbar;
