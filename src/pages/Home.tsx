import { useState } from 'react';
import styled from 'styled-components';
import { SearchBar } from '../components/SearchBar';
import { VirtualizedPhotoList } from '../components/VirtualizedPhotoList';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 24px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin: 0;
  text-align: center;
`;

const Container = styled.main`
  padding: 32px;
`;

export const Home = () => {
  const [query, setQuery] = useState<string>('');

  return (
    <Container>
      <Header>
        <Title>Masonry Grid</Title>
        <SearchBar onSearch={setQuery} />
      </Header>
      <VirtualizedPhotoList query={query} />
    </Container>
  );
};
