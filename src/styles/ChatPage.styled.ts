import styled from 'styled-components';
import { StyledHomePage } from './HomePage.styled';

type StyledMessageProps = {
  sender: 'true' | undefined;
};

export const StyledChatPage = styled(StyledHomePage)`
  svg {
    height: 26px;
    width: 26px;
  }
`;

export const StyledMessages = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  height: 300px;
  overflow-y: scroll;

  @media (width <= ${(props) => props.theme.mobile}) {
    height: 100svh;
  }
`;

export const StyledIsTyping = styled.p`
  padding: 0.2em 0.1em;
  background-color: ${(props) => props.theme.colours.bgTertiary};

  span {
    font-weight: 800;
  }
`;

export const StyledMessage = styled.div<StyledMessageProps>`
  background-color: ${(props) =>
    props.sender
      ? (props) => props.theme.colours.bgSecondary
      : (props) => props.theme.colours.bgTertiary};
  padding: 0.1em 0.1em;
  font-size: ${(props) => props.theme.fontSizes.standard};
  text-align: justify;
  word-spacing: -1px;

  .sender {
    font-weight: 700;

    .date {
      font-weight: normal;
    }
  }

  .message {
    padding-top: 0.05em;
  }

  @media (width <= ${(props) => props.theme.mobile}) {
    padding: 0.1em 0.2em;
  }
`;

export const StyledDay = styled.div`
  position: absolute;
  right: 0;
  padding-top: 0.4em;
  padding-right: 0.2em;
  font-size: ${(props) => props.theme.fontSizes.extraSmall};

  p {
    transform: rotate(3deg);
  }
`;

export const StyledEditor = styled.div``;

export const StyledToolbar = styled.div`
  display: flex;
  gap: 14px;
  background-color: ${(props) => props.theme.colours.bgPrimary};
  border-top: 2px solid ${(props) => props.theme.colours.primary};
  border-bottom: 2px solid ${(props) => props.theme.colours.primary};
  padding: 0.25em;

  .toolbar-btn {
    background: transparent;
    border: none;
    width: 20px;
    height: 20px;

    svg {
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
  }

  .emoticon-btn-wrapper {
    position: relative;
    width: 20px;
    height: 20px;
  }
`;

export const StyledEmoticons = styled.div`
  position: absolute;
  top: -120px;
  left: 16px;
  width: 200px;
  background-color: ${(props) => props.theme.colours.bgPrimary};
  border: 2px solid ${(props) => props.theme.colours.primary};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    margin: 0.2em;
    cursor: pointer;

    img {
      height: 100%;
      width: 100%;
    }
  }

  @media (hover: hover) {
    img {
      &:hover {
        transform: scale(1.2);
      }
    }
  }
`;

export const StyledInputField = styled.div`
  height: 150px;
  padding: 0.2em;
  overflow-y: scroll;

  &:focus-visible {
    outline: none;
  }
`;

export const StyledInputButtons = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colours.bgPrimary};
  border-top: 2px solid ${(props) => props.theme.colours.primary};
  padding: 0.2em;

  button {
    padding: 0.3em 1.5em;
    cursor: pointer;
  }
`;
