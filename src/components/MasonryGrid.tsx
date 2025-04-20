import styled from 'styled-components';
import type { PexelsPhoto } from '../types/Pexels';
import { PhotoCard } from './PhotoCard';

interface Props {
  photos: PexelsPhoto[];
  columns?: number;
}

const Masonry = styled.div<{ $columns: number }>`
  column-count: ${({ $columns }) => $columns};
  column-gap: 24px;

  @media (max-width: 1200px) {
    column-count: ${({ $columns }) => Math.max($columns - 1, 1)};
  }

  @media (max-width: 900px) {
    column-count: ${({ $columns }) => Math.max($columns - 2, 1)};
  }

  @media (max-width: 600px) {
    column-count: 1;
  }
`;

const Item = styled.div`
  break-inside: avoid;
  margin-bottom: 24px;
`;

export const MasonryGrid = ({ photos, columns = 4 }: Props) => {
  return (
    <Masonry $columns={columns}>
      {photos.map((photo) => (
        <Item key={photo.id}>
          <PhotoCard photo={photo} />
        </Item>
      ))}
    </Masonry>
  );
};
