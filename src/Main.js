import { useState, useEffect } from 'react';
import ErrorMessage from './Reuseable/ErrorMessage';
import Loader from './Reuseable/Loader';
import Box from './Box';
import MoviesList from './MoviesList/MoviesList';
import WatchedSummary from './Watched/WatchedSummary';
import WatchedMoviesList from './Watched/WatchedMoviesList';

export default function Main({ movies, tempWatchedData, error, loading }) {
  console.log(loading, error);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <main className='main'>
      <Box>
        {!loading && !error && <MoviesList movies={movies} />}
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
      </Box>
      <Box>
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      </Box>
    </main>
  );
}
