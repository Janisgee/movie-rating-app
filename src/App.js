import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Main from './Main';
import { doc } from 'prettier';

const apiKey = '8be92ce5';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleCloseMovie() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      async function getFetch() {
        try {
          setLoading(true);
          setError('');

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
          );
          console.log(res);

          if (!res.ok) throw new Error('Something went wrong!');
          const resData = await res.json();
          if (resData.Response === 'False') throw new Error('Movie not found!');

          console.log(resData);
          setMovies(resData.Search);
        } catch (err) {
          console.log(err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      handleCloseMovie();
      if (query.length <= 3) {
        setMovies([]);
        setError('');
        return;
      }
      getFetch();
    },
    [query],
  );

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
