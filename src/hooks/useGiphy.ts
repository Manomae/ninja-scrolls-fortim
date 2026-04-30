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
      
      let endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchQuery)}&limit=25&rating=g`;
      
      // Handle direct Giphy URLs by extracting ID
      const giphyUrlPattern = /giphy\.com\/gifs\/(?:.*-)?([a-zA-Z0-9]+)/;
      const match = searchQuery.match(giphyUrlPattern);
      
      let finalEndpoint = endpoint;
      if (match && match[1]) {
        finalEndpoint = `https://api.giphy.com/v1/gifs/${match[1]}?api_key=${apiKey}`;
      }

      const response = await fetch(finalEndpoint);
      
      if (!response.ok) {
        throw new Error('Falha na conexão com o Reino Giphy');
      }

      const data = await response.json();
      
      if (match && match[1]) {
        // Single GIF API returns { data: { ... } }
        setGifs(data.data ? [data.data] : []);
      } else {
        // Search API returns { data: [ ... ] }
        setGifs(data.data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro oculto');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGifs(query);
  }, [query, fetchGifs]);

  return { gifs, loading, error, refetch: () => fetchGifs(query) };
}
