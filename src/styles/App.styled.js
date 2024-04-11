import styled from 'styled-components';

export const StyledHeader = styled.header`
  transform: rotate(-4deg);

  h1 {
    font-family: ${(props) => props.theme.fonts.secondary};
    font-size: 3em;
    font-weight: 400;
  }
`;
