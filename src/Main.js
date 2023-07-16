import { useState, useEffect } from 'react';
import ErrorMessage from './Reuseable/ErrorMessage';
import Loader from './Reuseable/Loader';
import Box from './Box';
import MoviesList from './MoviesList/MoviesList';
import MovieDetails from './MoviesList/MovieDetails';
import WatchedSummary from './Watched/WatchedSummary';
import WatchedMoviesList from './Watched/WatchedMoviesList';

const storage = JSON.parse(localStorage.getItem('watched'));

export default function Main({
  movies,
  error,
  loading,
  selectedId,
  onSelectedId,
  onCloseMovie,
}) {
  const [watched, setWatched] = useState(storage);

  function handleSelectedMovie(id) {
    onSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem('watched', JSON.stringify(watched));
    },
    [watched],
  );

  return (
    <main className='main'>
      <Box>
        {!loading && !error && (
          <MoviesList movies={movies} onSelectedMovie={handleSelectedMovie} />
        )}
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
      </Box>
      <Box>
        {selectedId ? (
          <MovieDetails
            selectedId={selectedId}
            onCloseMovie={onCloseMovie}
            onAddWatched={handleAddWatched}
            watched={watched}
          />
        ) : (
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList
              watched={watched}
              onDeleteWatched={handleDeleteWatched}
            />
          </>
        )}
      </Box>
    </main>
  );
}
