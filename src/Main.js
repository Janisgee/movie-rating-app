import { useLocalStorageState } from './OwnUseHook/useLocalStorageState';
import ErrorMessage from './Reuseable/ErrorMessage';
import Loader from './Reuseable/Loader';
import Box from './Box';
import MoviesList from './MoviesList/MoviesList';
import MovieDetails from './MoviesList/MovieDetails';
import WatchedSummary from './Watched/WatchedSummary';
import WatchedMoviesList from './Watched/WatchedMoviesList';

export default function Main({
  movies,
  error,
  loading,
  selectedId,
  onSelectedId,
  onCloseMovie,
}) {
  const [watched, setWatched] = useLocalStorageState([], 'watched');

  function handleSelectedMovie(id) {
    onSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
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
