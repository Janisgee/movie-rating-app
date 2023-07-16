import { useState, useEffect } from 'react';
import ErrorMessage from '../Reuseable/ErrorMessage';
import Loader from '../Reuseable/Loader';
import StarRating from '../StarRating';
const apiKey = '8be92ce5';

export default function MovieDetails({ selectedId, onCloseMovie }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [rating, setRating] = useState(0);
  console.log(selectedId);

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
          console.log(data);

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
              <StarRating size={23} onSetRating={setRating} />
              <button className='btn-add'>+ Add to list</button>
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
