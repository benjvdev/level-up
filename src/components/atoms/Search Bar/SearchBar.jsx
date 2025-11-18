import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

export default function BotonBuscar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <form id='search-bar' onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Busca los mejores productos para gamers :)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type='submit' aria-label="Buscar">
        <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>
    </form>
  );
}
