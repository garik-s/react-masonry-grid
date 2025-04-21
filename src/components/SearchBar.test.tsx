import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from '../components/SearchBar';

vi.mock('../hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

describe('SearchBar', () => {
  let onSearchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onSearchMock = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the input field', () => {
    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText('Search photos...');
    expect(input).toBeInTheDocument();
  });

  it('calls onSearch with the trimmed input value', async () => {
    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText('Search photos...');

    fireEvent.change(input, { target: { value: '  sunset  ' } });
    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith('sunset');
    });
  });

  it('updates the input value on user typing', () => {
    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText('Search photos...');

    fireEvent.change(input, { target: { value: 'ocean' } });
    expect(input).toHaveValue('ocean');
  });
});
