import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  margin-bottom: 24px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top-color: #005fa3;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const Loading = () => (
  <SpinnerWrapper>
    <Spinner />
  </SpinnerWrapper>
);
