import { useState, useEffect } from 'react';
import { fetchCountries } from '../services/countryService';
import { Country } from '../types';

const useFetchCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error) {
        setError('Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };
    getCountries();
  }, []);

  return { countries, loading, error };
};

export default useFetchCountries;
