import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { PexelsPhoto } from '../types/Pexels';
import { usePhotoById } from '../hooks/usePhotoById';
import { Loading } from '../components/Loading';

const Container = styled.main`
  padding: 32px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  background-color: #0077cc;
  border-radius: 8px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;

  &:hover {
    background-color: #005fa3;
  }

  &::before {
    content: '←';
    margin-right: 8px;
    font-weight: bold;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Info = styled.section`
  flex: 1;
  h2 {
    margin-top: 0;
    font-size: 1.5rem;
    color: #333;
  }
  p {
    margin: 8px 0;
    color: #555;
    line-height: 1.4;
  }
  a {
    color: #0077cc;
    text-decoration: none;
  }
`;

const ImageWrapper = styled.div`
  flex: 2;
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }
`;

export const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const photo: PexelsPhoto | null = usePhotoById(id);

  if (!photo) return <Loading />;

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      </Header>

      <Content>
        <Info>
          <h2>{photo.alt}</h2>
          <p><strong>Photographer:</strong> <a href={photo.photographer_url} target="_blank" rel="noopener noreferrer">{photo.photographer}</a></p>
          <p><strong>View on Pexels:</strong> <a href={photo.url} target="_blank" rel="noopener noreferrer">Click here</a></p>
        </Info>
        <ImageWrapper>
          <img loading="lazy" src={photo.src.landscape} alt={photo.alt}  />
        </ImageWrapper>
      </Content>
    </Container>
  );
};
