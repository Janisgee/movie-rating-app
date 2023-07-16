import { useState, useEffect } from 'react';
import ErrorMessage from './Reuseable/ErrorMessage';
import Loader from './Reuseable/Loader';
import Box from './Box';
import MoviesList from './MoviesList/MoviesList';
import MovieDetails from './MoviesList/MovieDetails';
import WatchedSummary from './Watched/WatchedSummary';
import WatchedMoviesList from './Watched/WatchedMoviesList';

export default function Main({ movies, tempWatchedData, error, loading }) {
  const [watched, setWatched] = useState(tempWatchedData);
  const [selectedId, setSelectedId] = useState(null);

  console.log(selectedId);

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

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
            onCloseMovie={handleCloseMovie}
          />
        ) : (
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </>
        )}
      </Box>
    </main>
  );
}
