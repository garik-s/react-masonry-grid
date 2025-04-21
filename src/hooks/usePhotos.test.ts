import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePhotos } from '../hooks/usePhotos';
import * as service from '../services/pexelsService';
import type { PexelsPhoto } from '../types/Pexels';

const mockCuratedPhotos = [
  { id: 1, photographer: 'A', src: { medium: 'url1' } } as PexelsPhoto,
  { id: 2, photographer: 'B', src: { medium: 'url2' } } as PexelsPhoto,
];

const mockSearchPhotos = [
  { id: 3, photographer: 'C', src: { medium: 'url3' } } as PexelsPhoto,
  { id: 4, photographer: 'D', src: { medium: 'url4' } } as PexelsPhoto,
];

describe('usePhotos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches curated photos on initial load', async () => {
    vi.spyOn(service, 'fetchCuratedPhotos').mockResolvedValue(mockCuratedPhotos);
    const { result } = renderHook(() => usePhotos(''));

    await act(() => result.current.loadPhotos());

    expect(service.fetchCuratedPhotos).toHaveBeenCalledWith(1);
    expect(result.current.photos).toEqual(mockCuratedPhotos);
    expect(result.current.loading).toBe(false);
    expect(result.current.hasMore).toBe(true);
  });

  it('fetches search photos when query is provided', async () => {
    vi.spyOn(service, 'searchPhotos').mockResolvedValue(mockSearchPhotos);
    const { result } = renderHook(() => usePhotos('mountains'));

    await act(() => result.current.loadPhotos());

    expect(service.searchPhotos).toHaveBeenCalledWith('mountains', 1);
    expect(result.current.photos).toEqual(mockSearchPhotos);
  });

  it('sets hasMore to false when no more photos returned', async () => {
    vi.spyOn(service, 'fetchCuratedPhotos').mockResolvedValue([]);
    const { result } = renderHook(() => usePhotos(''));

    await act(() => result.current.loadPhotos());

    expect(result.current.hasMore).toBe(false);
  });

  it('resets state when query changes', async () => {
    vi.spyOn(service, 'searchPhotos').mockResolvedValue(mockSearchPhotos);

    const { result, rerender } = renderHook(({ query }) => usePhotos(query), {
      initialProps: { query: 'cats' },
    });

    await act(() => result.current.loadPhotos());

    expect(result.current.photos.length).toBe(2);

    rerender({ query: 'dogs' });

    expect(result.current.photos).toEqual([]);
    expect(result.current.hasMore).toBe(true);
  });

  it('handles errors', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(service, 'fetchCuratedPhotos').mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => usePhotos(''));

    await act(() => result.current.loadPhotos());

    expect(result.current.hasMore).toBe(false);
    expect(result.current.loading).toBe(false);

    errorSpy.mockRestore();
  });
});
