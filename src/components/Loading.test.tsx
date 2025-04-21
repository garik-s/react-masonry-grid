import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loading } from './Loading';

describe('Loading', () => {
  it('renders the spinner wrapper and spinner correctly', () => {
    render(<Loading />);
    
    const wrapper = screen.getByTestId('spinner-wrapper');
    expect(wrapper).toBeInTheDocument();

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
