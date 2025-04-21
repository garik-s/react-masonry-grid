import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Boom');
};

describe('ErrorBoundary', () => {
  it('renders fallback UI on error', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});