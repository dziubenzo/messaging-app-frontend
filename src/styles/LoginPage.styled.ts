import styled from 'styled-components';

export const StyledLoginPage = styled.main`
  position: relative;
  max-width: 400px;
  background-color: ${(props) => props.theme.colours.bgSecondary};
  border: 2px solid ${(props) => props.theme.colours.primary};

  .top-bar {
    background-color: ${(props) => props.theme.colours.topBar};
    border-bottom: 2px solid ${(props) => props.theme.colours.primary};
    margin-bottom: 2em;

    p {
      color: white;
      font-weight: 700;
      letter-spacing: 2px;
      padding: 0.5em;
      text-align: center;
    }
  }

  form {
    display: grid;
    grid-template-columns: auto;
    gap: 16px 32px;
    padding: 1em;
    place-items: center;

    label {
      justify-self: left;
      cursor: pointer;
    }

    input {
      font-size: ${(props) => props.theme.fontSizes.standard};
      padding: 0.2em;
      width: 100%;
    }

    button {
      grid-column: 1 / 3;
      width: 50%;
      padding: 0.3em;
      margin-top: 3em;
    }
  }

  a {
    position: absolute;
    right: 0;
    bottom: -75px;

    button {
      padding: 0.5em;
    }
  }

  .guest-account-btn {
    position: absolute;
    bottom: -75px;
    padding: 0.5em;
  }

  button {
    cursor: pointer;
  }

  @media (width <= ${(props) => props.theme.mobile}) {
    form {
      gap: 16px;
    }
  }
`;
