import styled from 'styled-components';

export const StyledHomePage = styled.main`
  width: 400px;
  background-color: ${(props) => props.theme.colours.bgSecondary};
  border: 2px solid ${(props) => props.theme.colours.primary};
  z-index: 1;

  @media (width <= ${(props) => props.theme.mobile}) {
    width: 90vw;
    max-width: 400px;
  }
`;

export const StyledTopBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colours.topBar};
  border-bottom: 2px solid ${(props) => props.theme.colours.primary};
  padding: 0 0.2em;

  img {
    width: 18px;
    height: 18px;
  }

  p {
    font-size: ${(props) => props.theme.fontSizes.small};
    color: white;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 0.5em;
    text-align: start;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button {
    background: transparent;
    border: none;
    margin-left: auto;
    width: 20px;
    height: 20px;
    cursor: pointer;

    svg {
      fill: white;
      height: 100%;
      width: 100%;
    }
  }

  .close-chat-btn {
    width: 26px;
    height: 26px;
  }
`;

export const StyledContactsBar = styled.div`
  display: flex;
  justify-content: start;
  gap: 16px;
  padding: 0.2em;
  border-bottom: 2px solid ${(props) => props.theme.colours.primary};

  a {
    text-decoration: none;

    &.active {
      p {
        font-weight: 800;
      }
    }
  }

  a:last-child {
    margin-left: auto;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    svg {
      height: 32px;
      width: 32px;
    }

    p {
      font-size: ${(props) => props.theme.fontSizes.extraSmall};
      text-align: center;
    }
  }
`;

export const MiddleSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 500px;
  overflow-y: scroll;
`;

export const StyledContact = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2em;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin-right: 0.2em;
  }

  .user-info,
  .group-chat-info {
    max-width: 80%;

    .username,
    .group-chat-name {
      font-size: ${(props) => props.theme.fontSizes.standard};
      font-weight: 800;
    }

    .text-status,
    .group-chat-members {
      font-size: ${(props) => props.theme.fontSizes.small};
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    margin-left: auto;
    margin-right: 0.2em;
    width: 23px;
    height: 100%;
    cursor: pointer;

    svg {
      height: 100%;
      width: 100%;
    }
  }

  @media (hover: hover) {
    &:hover {
      background-color: ${(props) => props.theme.colours.bgSelected};

      p {
        color: white;
      }

      svg {
        stroke: white;
        fill: white;
      }
    }
  }
`;

export const StyledBottomBar = styled.div`
  background-color: ${(props) => props.theme.colours.bgQuaternary};
  font-size: ${(props) => props.theme.fontSizes.small};
  border-top: 2px solid ${(props) => props.theme.colours.primary};
  border-bottom: 2px solid ${(props) => props.theme.colours.primary};
  padding: 0.2em;
  height: 60px;

  .text-status {
    margin-top: 0.5em;
    font-weight: 800;
  }
`;

export const StyledStatusBar = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colours.bgPrimary};
  font-size: ${(props) => props.theme.fontSizes.small};
  padding: 0.2em;

  .status {
    position: relative;
    display: flex;
    gap: 4px;
    align-items: center;
    cursor: pointer;

    &:hover {
      .statuses-drop-down {
        transform: translateY(100%) scaleY(1);
      }
    }
  }

  .statuses-drop-down {
    position: absolute;
    bottom: -4px;
    left: -4px;
    background-color: ${(props) => props.theme.colours.bgPrimary};
    border: 2px solid ${(props) => props.theme.colours.primary};
    border-top: none;
    transform-origin: top;
    transform: translateY(100%) scaleY(0);
    transition: transform 0.2s ease-in;

    button {
      display: flex;
      align-items: center;
      background: transparent;
      border: none;
      width: 125px;
      gap: 4px;
      padding: 0.5em 0.2em;
      cursor: pointer;

      &:hover {
        background-color: ${(props) => props.theme.colours.bgSelected};

        p {
          color: white;
        }
      }
    }
  }

  img {
    width: 18px;
    height: 18px;
  }

  a {
    margin-left: auto;

    svg {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
`;

export const StyledDevInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
  margin-right: auto;

  .dev-name {
    font-weight: 600;
    letter-spacing: 1px;
  }

  .github-logo {
    height: 24px;
    width: 24px;
  }
`;
