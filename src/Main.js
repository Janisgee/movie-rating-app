import { useState } from 'react';
import Box from './Box';
import MovieDetails from './MoviesDetails/MovieDetails';
import WatchedSummary from './Watched/WatchedSummary';
import WatchedMoviesList from './Watched/WatchedMoviesList';

export default function Main({ movies, tempWatchedData }) {
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <main className='main'>
      <Box>
        <ul className='list list-movies'>
          {movies?.map((movie) => (
            <MovieDetails movie={movie} key={movie.imdbID} />
          ))}
        </ul>
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
