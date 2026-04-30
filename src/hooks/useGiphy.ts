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
      
      // regex mais robusto para capturar ID do Giphy em várias situações
      const giphyUrlPattern = /(?:giphy\.com\/(?:gifs|media)\/|i\.giphy\.com\/|media\.giphy\.com\/media\/)(?:.*-)?([a-zA-Z0-9]+)/i;
      const match = searchQuery.match(giphyUrlPattern);
      
      let finalEndpoint = endpoint;
      if (match && match[1]) {
        // Se for um link direto, usamos o endpoint de ID único
        finalEndpoint = `https://api.giphy.com/v1/gifs/${match[1]}?api_key=${apiKey}`;
      }

      const response = await fetch(finalEndpoint);
      
      if (!response.ok) {
        throw new Error('Falha na conexão com o Reino Giphy');
      }

      const data = await response.json();
      
      if (match && match[1]) {
        // O endpoint de ID único retorna um objeto simples em 'data'
        setGifs(data.data && !Array.isArray(data.data) ? [data.data] : (Array.isArray(data.data) ? data.data : []));
      } else {
        // O endpoint de busca retorna um array em 'data'
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
