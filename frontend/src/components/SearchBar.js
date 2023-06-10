import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
      <style>{`
        .search-bar {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        
        .search-input {
          width: 70%;
          padding: 10px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          background-color: #f1f1f1;
          transition: width 0.4s ease-in-out;
        }
        
        .search-input:focus {
          width: 75%;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
