import styled from 'styled-components';

export const StyledErrorPage = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;

  a {
    text-underline-offset: 0.35em;
    text-decoration-color: ${props => props.theme.colours.bgSecondary};
  }
`;
