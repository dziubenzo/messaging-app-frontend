import styled from 'styled-components';

export const StyledHeader = styled.header`
  position: absolute;
  top: 1em;
  transform: rotate(-4deg);

  .app-name {
    font-family: ${(props) => props.theme.fonts.secondary};
    font-size: 3em;
    font-weight: 400;
    text-align: center;
  }

  @media (width <= ${(props) => props.theme.mobile}) {
    display: none;
  }
`;
