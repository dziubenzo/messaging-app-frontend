import styled from 'styled-components';

export const StyledOptionsTab = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500px;
  padding: 0.5em;
  gap: 16px;

  form {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;

    label {
      text-align: center;
      cursor: pointer;
    }

    input,
    textarea {
      font-size: ${(props) => props.theme.fontSizes.standard};
      background-color: ${(props) => props.theme.colours.bgSecondary};
      border: none;
      outline: 2px solid ${(props) => props.theme.colours.bgPrimary};
      padding: 0.2em;
      width: 100%;
      resize: none;

      &:focus-visible {
        outline: 3px solid ${(props) => props.theme.colours.bgPrimary};
      }
    }

    input {
      width: 18ch;
      align-self: center;
      text-align: center;
    }

    .characters-left {
      position: absolute;
      text-align: center;
      width: 3ch;
      bottom: 0.3em;
      right: 0.3em;
      padding: 0.2em;
      font-size: ${(props) => props.theme.fontSizes.small};
      font-weight: 600;
      letter-spacing: 1px;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-around;

    button {
      width: 23%;
      align-self: center;
      font-size: ${(props) => props.theme.fontSizes.standard};
      padding: 0.3em 0.5em;
      cursor: pointer;
    }

    button:nth-child(2) {
      width: 25%;
    }
  }

  @media (width <= ${(props) => props.theme.mobile}) {
    .buttons {
      justify-content: space-evenly;

      button {
        min-width: 25%;
      }

      button:nth-child(2) {
        min-width: 30%;
      }
    }
  }
`;
