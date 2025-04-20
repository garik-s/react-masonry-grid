import { useEffect, useState } from 'react';
import { getPhotoById } from '../services/pexelsService';
import type { PexelsPhoto } from '../types/Pexels';

export const usePhotoById = (id: string | undefined) => {
  const [photo, setPhoto] = useState<PexelsPhoto | null>(null);

  useEffect(() => {
    const fetchSingle = async () => {
      if (!id) return;
      try {
        const fetched = await getPhotoById(Number(id));
        setPhoto(fetched);
      } catch (e) {
        console.error(e);
      }
    };
    fetchSingle();
  }, [id]);

  return photo;
};