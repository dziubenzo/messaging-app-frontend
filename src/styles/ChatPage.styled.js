import styled from 'styled-components';
import { StyledHomePage } from './HomePage.styled';

export const StyledChatPage = styled(StyledHomePage)`
  svg {
    height: 26px;
    width: 26px;
  }
`;

export const StyledMessages = styled.div`
  display: flex;
  height: 300px;
  overflow-y: scroll;
  flex-direction: column-reverse;

  .spinner {
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 200%);
  }
`;

export const StyledMessage = styled.div`
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
`;

export const StyledEditor = styled.div``;

export const StyledToolbar = styled.div`
  display: flex;
  gap: 12px;
  background-color: ${(props) => props.theme.colours.bgPrimary};
  border-top: 2px solid ${(props) => props.theme.colours.primary};
  border-bottom: 2px solid ${(props) => props.theme.colours.primary};
  padding: 0.4em 0.2em;

  svg {
    height: 16px;
    width: 16px;
    cursor: pointer;
  }

  .emoticons-wrapper {
    position: relative;
  }
`;

export const StyledEmoticons = styled.div`
  position: absolute;
  top: -125px;
  left: 16px;
  width: 200px;
  background-color: ${(props) => props.theme.colours.bgPrimary};
  border: 2px solid ${(props) => props.theme.colours.primary};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  img {
    margin: 0.2em;
    cursor: pointer;
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
