import MovieItem from './MovieItem';

export default function MoviesList({ movies, onSelectedMovie }) {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <MovieItem
          movie={movie}
          key={movie.imdbID}
          onSelectedMovie={onSelectedMovie}
        />
      ))}
    </ul>
  );
}
