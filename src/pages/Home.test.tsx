import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { Home } from './Home';

vi.mock('../components/SearchBar', () => ({
  SearchBar: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <div>
      <input
        data-testid="search-input"
        type="text"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  ),
}));

vi.mock('../components/VirtualizedPhotoList', () => ({
  VirtualizedPhotoList: ({ query }: { query: string }) => (
    <div data-testid="photo-list">Query: {query}</div>
  ),
}));

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title', () => {
    render(<Home />);
    expect(screen.getByText('Masonry Grid')).toBeInTheDocument();
  });

  it('renders SearchBar and VirtualizedPhotoList', () => {
    render(<Home />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('photo-list')).toHaveTextContent('Query:');
  });

  it('updates query when SearchBar triggers onSearch', async () => {
    render(<Home />);
    const input = screen.getByTestId('search-input');

    await userEvent.type(input, 'ocean');

    expect(screen.getByTestId('photo-list')).toHaveTextContent('Query: ocean');
  });
});
