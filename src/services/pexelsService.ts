import type { PexelsPhoto } from '../types/Pexels';
import { PEXELS_API_KEY, BASE_URL, PER_PAGE } from '../constants/api';

const fetchFromPexels = async (url: string): Promise<PexelsPhoto[]> => {
  const res = await fetch(url, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch photos');

  const data = await res.json();
  return data.photos;
};

export const fetchCuratedPhotos = async (
  page = 1,
  perPage = PER_PAGE
): Promise<PexelsPhoto[]> => {
  const url = `${BASE_URL}/curated?per_page=${perPage}&page=${page}`;
  return fetchFromPexels(url);
};

export const searchPhotos = async (
  query: string,
  page = 1,
  perPage = PER_PAGE
): Promise<PexelsPhoto[]> => {
  const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;
  return fetchFromPexels(url);
};

export const getPhotoById = async (id: number): Promise<PexelsPhoto> => {
  const res = await fetch(`${BASE_URL}/photos/${id}`, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch photo');

  return res.json();
};
