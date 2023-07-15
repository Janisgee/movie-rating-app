import MovieDetails from './MovieDetails';

export default function MoviesList({ movies }) {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <MovieDetails movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
