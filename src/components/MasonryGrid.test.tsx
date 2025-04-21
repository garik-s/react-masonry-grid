import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MasonryGrid } from './MasonryGrid';
import type { PexelsPhoto } from '../types/Pexels';

vi.mock('../components/PhotoCard', () => ({
  PhotoCard: ({ photo }: { photo: PexelsPhoto }) => (
    <div data-testid="photo-card">{photo.alt}</div>
  ),
}));

const mockPhotos: PexelsPhoto[] = [
  {
    id: 1,
    alt: 'A beautiful sunrise',
    photographer: 'John Doe',
    src: {
      original: '',
      large2x: '',
      large: '',
      medium: '',
      small: '',
      portrait: '',
      landscape: '',
      tiny: '',
    },
    url: '',
    photographer_url: '',
    photographer_id: 1,
    avg_color: '',
    width: 1000,
    height: 1000,
  },
];

describe('MasonryGrid', () => {
  it('renders photo cards when photos are provided', () => {
    render(
      <MemoryRouter>
        <MasonryGrid photos={mockPhotos} columns={3} loading={false} />
      </MemoryRouter>
    );
    const cards = screen.getAllByTestId('photo-card');
    expect(cards.length).toBe(mockPhotos.length);
    expect(screen.queryByText(/No photos found/i)).not.toBeInTheDocument();
  });

  it('shows empty message when no photos and not loading', () => {
    render(
      <MemoryRouter>
        <MasonryGrid photos={[]} loading={false} />
      </MemoryRouter>
    );
    expect(screen.getByText(/No photos found/i)).toBeInTheDocument();
    expect(screen.getByText(/We couldn’t find any photos/i)).toBeInTheDocument();
  });

  it('does not show empty message when loading is true', () => {
    render(
      <MemoryRouter>
        <MasonryGrid photos={[]} loading={true} />
      </MemoryRouter>
    );
    expect(screen.queryByText(/No photos found/i)).not.toBeInTheDocument();
  });
});
