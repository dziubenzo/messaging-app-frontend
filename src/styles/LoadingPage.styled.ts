import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const StyledLoadingPage = styled.main`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 32px;

  img {
    animation: ${rotate} 2s ease-out infinite;
  }
`;
