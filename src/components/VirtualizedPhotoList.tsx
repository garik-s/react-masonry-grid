import styled from 'styled-components';
import { MasonryGrid } from './MasonryGrid';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Loading } from './Loading';
import { usePhotos } from '../hooks/usePhotos';

interface Props {
  query: string;
}

const LoadMore = styled.div`
  height: 20px;
  margin-top: 24px;
`;

export const VirtualizedPhotoList = ({ query }: Props) => {
  const { photos, loading, hasMore, loadPhotos } = usePhotos(query);

  const loadMoreRef = useInfiniteScroll(loadPhotos, hasMore);

  return (
    <>
      <MasonryGrid photos={photos} columns={4} loading={loading} />
      {loading && <Loading />}
      {hasMore && !loading && <LoadMore ref={loadMoreRef} />}
    </>
  );
};
