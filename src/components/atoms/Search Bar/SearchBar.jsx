import React from 'react'
import './SearchBar.css'
export default function BotonBuscar() {
  return (
    <form id='search-bar'>
      <input type="text" placeholder="Busca los mejores productos para gamers :)"/>
        <button type='submit'>
          <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
              <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
    </form>
  )
}
