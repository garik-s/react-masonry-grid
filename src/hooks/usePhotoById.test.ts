import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePhotoById } from '../hooks/usePhotoById';
import * as service from '../services/pexelsService';
import type { PexelsPhoto } from '../types/Pexels';

const mockPhoto: PexelsPhoto = {
  id: 123,
  photographer: 'John Doe',
  src: { medium: 'https://example.com/photo.jpg' },
} as PexelsPhoto;

describe('usePhotoById', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and return a photo by ID', async () => {
    vi.spyOn(service, 'getPhotoById').mockResolvedValue(mockPhoto);

    const { result } = renderHook(() => usePhotoById('123'));

    await waitFor(() => {
      expect(result.current).toEqual(mockPhoto);
    });

    expect(service.getPhotoById).toHaveBeenCalledWith(123);
  });

  it('does not fetch if id is undefined', async () => {
    const spy = vi.spyOn(service, 'getPhotoById');
    const { result } = renderHook(() => usePhotoById(undefined));

    await waitFor(() => {
      expect(result.current).toBe(null);
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it('handles fetch error', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(service, 'getPhotoById').mockRejectedValue(new Error('Failed'));

    const { result } = renderHook(() => usePhotoById('999'));

    await waitFor(() => {
      expect(result.current).toBe(null);
    });

    expect(service.getPhotoById).toHaveBeenCalledWith(999);

    errorSpy.mockRestore();
  });
});
