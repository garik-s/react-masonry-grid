import { memo } from 'react';
import styled from 'styled-components';
import type { PexelsPhoto } from '../types/Pexels';
import { PhotoCard } from './PhotoCard';

interface Props {
  photos: PexelsPhoto[];
  columns?: number;
  loading: boolean;
}

const Masonry = styled.div<{ $columns: number }>`
  column-count: ${({ $columns }) => $columns};
  column-gap: 24px;

  @media (max-width: 1280px) {
    column-count: ${({ $columns }) => Math.max($columns - 1, 1)};
  }

  @media (max-width: 1024px) {
    column-count: ${({ $columns }) => Math.max($columns - 2, 1)};
  }

  @media (max-width: 640px) {
    column-count: 1;
  }
`;

const Item = styled.div`
  break-inside: avoid;
  margin-bottom: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  margin-top: 60px;
  color: #666;
  font-size: 18px;
  line-height: 1.6;

  strong {
    display: block;
    font-size: 22px;
    color: #333;
    margin-bottom: 8px;
  }
`;

export const MasonryGrid =  memo(({ photos, columns = 4, loading }: Props) => {
  if (photos.length === 0 && !loading) {
    return (
      <EmptyState>
        <strong>No photos found</strong>
        We couldn’t find any photos. Try searching for something else.
      </EmptyState>
    );
  }

  return (
    <Masonry $columns={columns}>
      {photos.map((photo) => (
        <Item key={photo.id}>
          <PhotoCard photo={photo} />
        </Item>
      ))}
    </Masonry>
  );
});
