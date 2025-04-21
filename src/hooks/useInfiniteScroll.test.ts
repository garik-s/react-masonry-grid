import { renderHook, act } from '@testing-library/react';
import { useInfiniteScroll } from './useInfiniteScroll';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

vi.mock('./useThrottle', () => ({
  useThrottle: (cb: () => void) => cb,
}));

let intersectionCallback: (entries: IntersectionObserverEntry[]) => void;

const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();

describe('useInfiniteScroll', () => {
  beforeEach(() => {
    observe.mockReset();
    unobserve.mockReset();
    disconnect.mockReset();

    intersectionCallback = () => {};

    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn((cb: typeof intersectionCallback) => {
        intersectionCallback = cb;
        return {
          observe,
          unobserve,
          disconnect,
        };
      })
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('returns a ref with initial value null', () => {
    const fetchData = vi.fn();
    const { result } = renderHook(() => useInfiniteScroll(fetchData, true));
    expect(result.current.current).toBeNull();
  });

  it('calls fetchData when intersecting and hasMore is true', () => {
    const fetchData = vi.fn();
    renderHook(() => useInfiniteScroll(fetchData, true));

    act(() => {
      intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    expect(fetchData).toHaveBeenCalledTimes(1);
  });

  it('does not call fetchData if not intersecting', () => {
    const fetchData = vi.fn();
    renderHook(() => useInfiniteScroll(fetchData, true));

    act(() => {
      intersectionCallback([{ isIntersecting: false } as IntersectionObserverEntry]);
    });

    expect(fetchData).not.toHaveBeenCalled();
  });

  it('does not call fetchData if hasMore is false', () => {
    const fetchData = vi.fn();
    renderHook(() => useInfiniteScroll(fetchData, false));

    act(() => {
      intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    expect(fetchData).not.toHaveBeenCalled();
  });

  it('calls disconnect on unmount', () => {
    const fetchData = vi.fn();
    const { unmount } = renderHook(() => useInfiniteScroll(fetchData, true));
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });
});
