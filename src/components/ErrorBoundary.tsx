import { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background-color: #fff3f3;
  color: #d32f2f;
  border: 1px solid #f44336;
  border-radius: 12px;
  margin: 32px;
  text-align: center;
`;

const ErrorMessage = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
`;

const RetryButton = styled.button`
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #b71c1c;
  }
`;

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Component Stack:', info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorWrapper role="alert">
          <ErrorMessage>Something went wrong.</ErrorMessage>
          <RetryButton onClick={this.handleRetry}>Try Again</RetryButton>
        </ErrorWrapper>
      );
    }

    return this.props.children;
  }
}
