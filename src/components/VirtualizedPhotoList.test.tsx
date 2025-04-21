import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest';
import { VirtualizedPhotoList } from './VirtualizedPhotoList';
import { usePhotos } from '../hooks/usePhotos';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import type { PexelsPhoto } from '../types/Pexels';

const mockPhotos: PexelsPhoto[] = [
  {
    id: 1,
    src: { medium: 'url1', original: '', small: '', large: '', large2x: '', portrait: '', landscape: '', tiny: '' },
    alt: 'photo 1',
    photographer: '',
    photographer_url: '',
    photographer_id: 0,
    avg_color: '',
    url: '',
    width: 0,
    height: 0,
  },
  {
    id: 2,
    src: { medium: 'url2', original: '', small: '', large: '', large2x: '', portrait: '', landscape: '', tiny: '' },
    alt: 'photo 2',
    photographer: '',
    photographer_url: '',
    photographer_id: 0,
    avg_color: '',
    url: '',
    width: 0,
    height: 0,
  },
];

vi.mock('../hooks/usePhotos', () => ({
  usePhotos: vi.fn(),
}));

vi.mock('../hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: vi.fn(),
}));

vi.mock('../components/MasonryGrid', () => ({
  MasonryGrid: ({ photos }: { photos: PexelsPhoto[] }) => (
    <div data-testid="masonry-grid">{photos.length} photos</div>
  ),
}));

vi.mock('../components/Loading', () => ({
  Loading: () => <div data-testid="loading">Loading...</div>,
}));

describe('VirtualizedPhotoList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders MasonryGrid with photos', () => {
    (usePhotos as Mock).mockReturnValue({
      photos: mockPhotos,
      loading: false,
      hasMore: true,
      loadPhotos: vi.fn(),
    });

    (useInfiniteScroll as Mock).mockReturnValue(vi.fn());

    render(<VirtualizedPhotoList query="nature" />);
    expect(screen.getByTestId('masonry-grid')).toHaveTextContent('2 photos');
  });

  it('shows loading spinner when loading is true', () => {
    (usePhotos as Mock).mockReturnValue({
      photos: [],
      loading: true,
      hasMore: true,
      loadPhotos: vi.fn(),
    });

    (useInfiniteScroll as Mock).mockReturnValue(vi.fn());

    render(<VirtualizedPhotoList query="mountains" />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('does not render LoadMore if hasMore is false', () => {
    (usePhotos as Mock).mockReturnValue({
      photos: mockPhotos,
      loading: false,
      hasMore: false,
      loadPhotos: vi.fn(),
    });

    (useInfiniteScroll as Mock).mockReturnValue(vi.fn());

    const { container } = render(<VirtualizedPhotoList query="abstract" />);
    expect(container.innerHTML).not.toContain('height: 20px');
  });
});
