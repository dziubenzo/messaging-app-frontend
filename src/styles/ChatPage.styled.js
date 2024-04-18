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
