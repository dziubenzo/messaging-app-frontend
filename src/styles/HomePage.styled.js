import styled from 'styled-components';

export const StyledHomePage = styled.main`
  width: 400px;
  background-color: ${(props) => props.theme.colours.bgSecondary};
  border: 2px solid ${(props) => props.theme.colours.primary};

  @media (width <= ${(props) => props.theme.mobile}) {
    width: 90vw;
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

  svg {
    margin-left: auto;
    fill: white;
    height: 22px;
    width: 22px;
    cursor: pointer;
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
    }
  }
`;

export const MiddleSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 500px;

  .loading-wrapper,
  .error-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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

  svg {
    margin-left: auto;
    margin-right: 0.3em;
    width: 20px;
    height: 20px;
    cursor: pointer;
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
    bottom: 0;
    left: -4px;
    background-color: ${(props) => props.theme.colours.bgPrimary};
    border: 2px solid ${(props) => props.theme.colours.primary};
    transform-origin: top;
    transform: translateY(100%) scaleY(0);
    transition: transform 0.2s ease-in;

    div {
      display: flex;
      width: 125px;
      gap: 4px;
      align-items: center;
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
