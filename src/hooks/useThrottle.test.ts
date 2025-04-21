import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useThrottle } from '../hooks/useThrottle';

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('calls the callback immediately the first time', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() => useThrottle(mockCallback, 1000));

    act(() => {
      result.current();
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('does not call the callback again if delay has not passed', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() => useThrottle(mockCallback, 1000));

    act(() => {
      result.current();
      result.current();
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(500);
      result.current();
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('calls the callback again after the delay has passed', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() => useThrottle(mockCallback, 1000));

    act(() => {
      result.current();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
      result.current();
    });

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
});
