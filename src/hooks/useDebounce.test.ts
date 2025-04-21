import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDebounce } from '../hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 1000));
    expect(result.current).toBe('initial');
  });

  it('updates the debounced value after the delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('updated');
  });

  it('cancels previous timer if value changes quickly', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'start' },
    });

    rerender({ value: 'fast1' });
    rerender({ value: 'fast2' });

    act(() => {
      vi.advanceTimersByTime(499);
    });

    expect(result.current).toBe('start');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe('fast2');
  });
});
