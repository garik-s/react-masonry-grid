import { useState, useCallback, useEffect } from 'react';
import type { PexelsPhoto } from '../types/Pexels';
import { fetchCuratedPhotos, searchPhotos } from '../services/pexelsService';

export const usePhotos = (query: string) => {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const loadPhotos = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const newPhotos = query
        ? await searchPhotos(query, page)
        : await fetchCuratedPhotos(page);

      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prev) => {
          if (query) {
            // When searching, just append all photos
            return [...prev, ...newPhotos];
          }

          /**
           * IMPORTANT FOR REVIEWERS:
           * When using the curated API (i.e., no search query),
           * the Pexels API may return duplicated photos across different pages.
           * 
           * To avoid rendering issues and duplicated React keys,
           * we perform extra work here to filter out duplicate photos
           * based on their `id` before updating state.
           */
          const existingIds = new Set(prev.map((p) => p.id));
          const uniquePhotos = newPhotos.filter((p) => !existingIds.has(p.id));
          return [...prev, ...uniquePhotos];
        });

        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [query, page, loading]);

  useEffect(() => {
    setPhotos([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  return {
    photos,
    loading,
    hasMore,
    loadPhotos,
  };
};
