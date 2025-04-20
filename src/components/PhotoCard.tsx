import styled from 'styled-components';
import type { PexelsPhoto } from '../types/Pexels';
import { Link } from 'react-router-dom';
import { LazyImage } from './LazyImage';

interface Props {
  photo: PexelsPhoto;
}

const Card = styled.div`
  margin-bottom: 16px;
  cursor: pointer;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const PhotoCard = ({ photo }: Props) => (
  <Link to={`/photo/${photo.id}`}>
    <Card>
      <LazyImage src={photo.src.medium} alt={photo.alt}  />
    </Card>
  </Link>
);
