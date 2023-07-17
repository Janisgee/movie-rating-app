import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Main from './Main';
import { useMovie } from './OwnUseHook/useMovie';

const apiKey = '8be92ce5';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { movies, loading, error } = useMovie(query);

  function handleCloseMovie() {
    setSelectedId(null);
  }

  return (
    <>
      <NavBar movies={movies} query={query} onQuery={setQuery} />

      <Main
        movies={movies}
        error={error}
        loading={loading}
        selectedId={selectedId}
        onSelectedId={setSelectedId}
        onCloseMovie={handleCloseMovie}
      />
    </>
  );
}
