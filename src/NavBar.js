import { useState } from 'react';

export default function NavBar({ movies, query, onQuery }) {
  return (
    <nav className='nav-bar'>
      <Logo />
      <Search query={query} onQuery={onQuery} />
      <NumResults movies={movies} />
    </nav>
  );
}

function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, onQuery }) {
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => onQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
