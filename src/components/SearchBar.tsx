import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () =>{
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
    };
  
    return (
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      );
    };

export default SearchBar