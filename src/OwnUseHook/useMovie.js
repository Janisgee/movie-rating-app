import { useFetch } from './useFetch';
const apiKey = '8be92ce5';

export function useMovie(query) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
  const { data, loading, error } = useFetch(
    query.length <= 3 ? '' : url,
    'Something went wrong!',
  );

  if (query.length <= 3) {
    return { movies: [], loading: false, error: '' };
  }

  if (data?.Response === 'False') {
    return { movies: [], loading, error: 'Movie not found!' };
  }

  return { movies: data ? data.Search : [], loading, error };
}
