import { useState, useEffect, useCallback } from 'react';
import { GiphyGif } from '../types';

const PUBLIC_DEMO_KEY = 'dc6zaTOxFJmzC';

export function useGiphy(query: string) {
  const [gifs, setGifs] = useState<GiphyGif[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGifs = useCallback(async (searchQuery: string) => {
    if (!searchQuery) return;
    
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_GIPHY_API_KEY || PUBLIC_DEMO_KEY;
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchQuery)}&limit=25&rating=g`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch GIFs');
      }

      const data = await response.json();
      setGifs(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGifs(query);
  }, [query, fetchGifs]);

  return { gifs, loading, error, refetch: () => fetchGifs(query) };
}
