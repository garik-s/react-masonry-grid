import { useEffect, useRef, useCallback } from 'react';
import { useThrottle } from './useThrottle';

export const useInfiniteScroll = (
  fetchData: () => void,
  hasMore: boolean,
  throttleDelay: number = 1000
) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const throttledFetch = useThrottle(fetchData, throttleDelay);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const isIntersecting = entries[0]?.isIntersecting;
      if (isIntersecting && hasMore) {
        throttledFetch();
      }
    },
    [hasMore, throttledFetch]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [handleIntersection]);

  return loadMoreRef;
};
