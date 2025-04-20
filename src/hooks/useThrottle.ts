import { useRef } from 'react';

export const useThrottle = (callback: () => void, delay: number) => {
  const lastCallRef = useRef<number>(0);

  return () => {
    const now = Date.now();
    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      callback();
    }
  };
};
