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

  // Various user feedback wrappers across the app
  .loading-wrapper,
  .error-wrapper,
  .no-contacts-wrapper,
  .no-group-chats-wrapper,
  .no-messages-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
    text-align: center;

    svg {
      height: 32px;
      width: 32px;
    }
  }

  // Toast background colour
  :root {
    --toastify-color-light: ${(props) => props.theme.colours.bgSecondary};
  }

  // Toast message icon
  .toast-message-icon {
    height: 28px;
    width: 28px;
  }

  // Toast utility class
  .bold {
    font-weight: 800;
  }
`;

export default GlobalStyle;
