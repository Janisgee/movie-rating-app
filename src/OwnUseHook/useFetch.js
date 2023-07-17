import { useEffect, useState } from 'react';

export function useFetch(url, errorMessage) {
  const [data, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      if (!url) return;
      const controller = new AbortController();

      async function fetchData() {
        try {
          setError('');
          setLoading(true);
          const res = await fetch(url, { signal: controller.signal });

          if (!res.ok) throw new Error(errorMessage);
          const resData = await res.json();

          setDate(resData);
          setError('');
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.log(err);
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      }
      fetchData();

      return function () {
        controller.abort();
      };
    },
    [url, errorMessage],
  );

  return { data, error, loading };
}
