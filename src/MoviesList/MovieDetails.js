import { useState, useEffect } from 'react';
import ErrorMessage from '../Reuseable/ErrorMessage';
import Loader from '../Reuseable/Loader';
import StarRating from '../StarRating';
const apiKey = '8be92ce5';

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  console.log(watched);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  console.log(isWatched);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;
  console.log(watchedUserRating);

  const {
    Title: title,
    Year: year,
    Released: released,
    Runtime: runtime,
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot: plot,
    Poster: poster,
    imdbID,
    imdbRating,
  } = selectedMovie;

  function handleAdd() {
    const newMovie = {
      title,
      poster,
      runtime: Number(runtime.split(' ').at(0)),
      imdbRating: Number(imdbRating),
      userRating: userRating,
      imdbID,
    };
    onAddWatched(newMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      function callBack(e) {
        if (e.code === 'Escape') {
          onCloseMovie();
          console.log('CLOSE');
        }
      }
      document.addEventListener('keydown', callBack);

      return function () {
        document.removeEventListener('keydown', callBack);
      };
    },
    [onCloseMovie],
  );

  useEffect(
    function () {
      async function getFetchMoviesDetails() {
        try {
          setError('');
          setLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`,
          );
          if (!res.ok)
            throw new Error(`Sorry, we cannot find movie details. 😔`);
          const data = await res.json();

          setSelectedMovie(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
        }
      }
      getFetchMoviesDetails();
    },
    [selectedId],
  );

  return (
    <div>
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}
      {!loading && !error && (
        <div className='details'>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <span className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb rating
              </p>
            </span>
          </header>
          <section>
            <div className='rating'>
              {isWatched ? (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating size={23} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </div>
  );
}
