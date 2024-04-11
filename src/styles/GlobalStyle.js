import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colours.background};
    color: ${(props) => props.theme.colours.primary};
  }
`;

export default GlobalStyle;
