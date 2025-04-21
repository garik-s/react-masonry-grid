import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCuratedPhotos, searchPhotos, getPhotoById } from './pexelsService';
import type { PexelsPhoto } from '../types/Pexels';

const mockPhotos: PexelsPhoto[] = [
  {
    id: 1,
    width: 4000,
    height: 3000,
    url: 'https://www.pexels.com/photo/1',
    photographer: 'Photographer One',
    photographer_url: 'https://www.pexels.com/@one',
    photographer_id: 1001,
    avg_color: '#000000',
    src: {
      original: 'https://example.com/original.jpg',
      large2x: 'https://example.com/large2x.jpg',
      large: 'https://example.com/large.jpg',
      medium: 'https://example.com/medium.jpg',
      small: 'https://example.com/small.jpg',
      portrait: 'https://example.com/portrait.jpg',
      landscape: 'https://example.com/landscape.jpg',
      tiny: 'https://example.com/tiny.jpg',
    },
    alt: 'A photo of nature',
  },
];

const mockFetch = vi.fn();

beforeEach(() => {
  vi.restoreAllMocks();
  globalThis.fetch = mockFetch;
});

describe('Pexels Service', () => {
  it('fetches curated photos successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ photos: mockPhotos }),
    });

    const result = await fetchCuratedPhotos(1, 10);
    const [[url]] = mockFetch.mock.calls;
    expect(url).toContain('/curated');
    expect(result).toEqual(mockPhotos);
  });

  it('fetches searched photos successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ photos: mockPhotos }),
    });

    const result = await searchPhotos('nature', 1, 10);
    const [[url]] = mockFetch.mock.calls;
    expect(url).toContain('/search?query=nature');
    expect(result).toEqual(mockPhotos);
  });

  it('fetches photo by ID successfully', async () => {
    const photo = mockPhotos[0];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => photo,
    });

    const result = await getPhotoById(photo.id);
    const [[url]] = mockFetch.mock.calls;
    expect(url).toContain(`/photos/${photo.id}`);
    expect(result).toEqual(photo);
  });

  it('throws error when curated photos fetch fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchCuratedPhotos()).rejects.toThrow('Failed to fetch photos');
  });

  it('throws error when searchPhotos fetch fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(searchPhotos('invalid')).rejects.toThrow('Failed to fetch photos');
  });

  it('throws error when getPhotoById fetch fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getPhotoById(123)).rejects.toThrow('Failed to fetch photo');
  });
});
