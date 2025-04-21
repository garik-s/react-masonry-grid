import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PhotoCard } from './PhotoCard';
import type { PexelsPhoto } from '../types/Pexels';

vi.mock('../components/LazyImage', () => ({
  LazyImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="lazy-image" />
  ),
}));

const mockPhoto: PexelsPhoto = {
  id: 123,
  alt: 'A stunning waterfall',
  photographer: 'Jane Doe',
  src: {
    original: '',
    large2x: '',
    large: '',
    medium: 'https://example.com/image.jpg',
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
  height: 800,
};

describe('PhotoCard', () => {
  it('renders photo with correct alt text', () => {
    render(
      <MemoryRouter>
        <PhotoCard photo={mockPhoto} />
      </MemoryRouter>
    );
    const image = screen.getByAltText(/a stunning waterfall/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockPhoto.src.medium);
  });

  it('links to the correct photo detail page', () => {
    render(
      <MemoryRouter>
        <PhotoCard photo={mockPhoto} />
      </MemoryRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/photo/${mockPhoto.id}`);
  });
});
