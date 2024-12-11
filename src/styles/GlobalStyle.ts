import { createGlobalStyle, keyframes } from 'styled-components';

const flicker = keyframes`
  from {
    opacity: 0.5;
  }

  to {
    opacity: 1;
  }
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Microsoft Sans Serif';
    src: url("/MSS.ttf");
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${(props) => props.theme.colours.primary};
    font-family: ${(props) => props.theme.fonts.primary};

    @supports (scrollbar-width: auto) {
      scrollbar-color: ${(props) => props.theme.colours.bgPrimary} ${(props) => props.theme.colours.bgSecondary};
      scrollbar-width: auto;
    }

    @supports selector(::-webkit-scrollbar) {
      &::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.colours.bgPrimary}
      }

      &::-webkit-scrollbar-track {
        background: ${(props) => props.theme.colours.bgSecondary};
      }
    }
  }

  body {
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.colours.bgPrimary};
  }

  #root {
    display: grid;
    grid-template-rows: 1fr;
    place-items: center;
    min-height: 100svh;
    max-width: 800px;
  }

  // Various user feedback wrappers across the app
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

  // Skeleton styling and animation
  .skeleton-line {
    width: max-content !important;
    background-color: ${(props) => props.theme.colours.bgPrimary} !important;
    color: ${(props) => props.theme.colours.bgPrimary} !important;
    border-radius: 6px;
    animation: ${flicker} 1s linear infinite alternate;

    &.mg-b {
      margin-bottom: 0.1em;
    }
  }

  .skeleton-icon {
    border-radius: 50%;
    animation: ${flicker} 1s linear infinite alternate;

    &.mg-r {
      margin-right: 0.2em;
    }
  }

  // Toast background colour
  :root {
    --toastify-color-light: ${(props) => props.theme.colours.bgSecondary};
  }

  // Toast icons
  .toast-icon {
    height: 26px;
    width: 26px;
  }

  // Toast utility class
  .bold {
    font-weight: 800;
  }

  // Place toast message right in the centre
  .Toastify__toast {
    text-align: center;
  }
`;

export default GlobalStyle;
