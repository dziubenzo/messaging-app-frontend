import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Microsoft Sans Serif;
    src: url("/MSS.ttf");
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${(props) => props.theme.colours.primary};
    font-family: ${(props) => props.theme.fonts.primary};
  }

  body {
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.colours.bgPrimary};
  }

  #root {
    display: grid;
    grid-template-rows: min-content auto min-content;
    place-items: center;
    min-height: 100svh;
    max-width: 800px;
    padding: 1em;
  }
`;

export default GlobalStyle;
