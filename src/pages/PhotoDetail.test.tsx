import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest';
import { PhotoDetail } from './PhotoDetail';
import { usePhotoById } from '../hooks/usePhotoById';
import { useParams, useNavigate } from 'react-router-dom';
import type { PexelsPhoto } from '../types/Pexels';

vi.mock('../hooks/usePhotoById', () => ({
  usePhotoById: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock('../components/Loading', () => ({
  Loading: () => <div data-testid="loading">Loading...</div>,
}));

const mockPhoto: PexelsPhoto = {
  id: 1,
  alt: 'Beautiful landscape',
  photographer: 'John Doe',
  photographer_url: 'https://pexels.com/@john',
  url: 'https://pexels.com/photo/1',
  src: {
    original: '',
    large2x: '',
    large: '',
    medium: '',
    small: '',
    portrait: '',
    landscape: 'https://example.com/landscape.jpg',
    tiny: '',
  },
  photographer_id: 123,
  avg_color: '',
  width: 1000,
  height: 800,
};

describe('PhotoDetail', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useParams as Mock).mockReturnValue({ id: '1' });
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  it('renders loading spinner if photo is not loaded', () => {
    (usePhotoById as Mock).mockReturnValue(null);

    render(<PhotoDetail />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders photo details when photo is available', () => {
    (usePhotoById as Mock).mockReturnValue(mockPhoto);

    render(<PhotoDetail />);
    expect(screen.getByText('Beautiful landscape')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockPhoto.src.landscape);
  });

  it('navigates back when back button is clicked', () => {
    (usePhotoById as Mock).mockReturnValue(mockPhoto);

    render(<PhotoDetail />);
    const backButton = screen.getByRole('button', { name: /back/i });
    
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
