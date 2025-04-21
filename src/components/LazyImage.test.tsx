import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { LazyImage } from './LazyImage';

const mockIntersectionObserver = vi.fn();
const observe = vi.fn();
const disconnect = vi.fn();

beforeEach(() => {
  mockIntersectionObserver.mockReset();
  observe.mockReset();
  disconnect.mockReset();

  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(() => ({
      observe,
      disconnect,
    }))
  );
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('LazyImage', () => {
  const src = 'https://example.com/image.jpg';
  const alt = 'A beautiful sunset';

  it('renders image with alt text', () => {
    render(<LazyImage src={src} alt={alt} data-testid="lazy-img" />);
    const img = screen.getByTestId('lazy-img');
    expect(img).toHaveAttribute('alt', alt);
  });

  it('updates loaded state on load', () => {
    render(<LazyImage src={src} alt={alt} data-testid="lazy-img" />);
    const img = screen.getByTestId('lazy-img');
    fireEvent.load(img);
    expect(img).toHaveStyle('opacity: 1');
  });

  it('uses lazy loading attribute', () => {
    render(<LazyImage src={src} alt={alt} data-testid="lazy-img" />);
    const img = screen.getByTestId('lazy-img');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('calls IntersectionObserver methods', () => {
    render(<LazyImage src={src} alt={alt} data-testid="lazy-img" />);
    expect(observe).toHaveBeenCalled();
  });
});