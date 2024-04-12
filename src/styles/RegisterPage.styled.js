import styled from 'styled-components';
import { StyledLoginPage } from './LoginPage.styled';

export const StyledRegisterPage = styled(StyledLoginPage)`
  form {
    button {
      margin-top: 3em;
    }
  }
  .error-message {
    position: absolute;
    bottom: 20%;
    text-align: center;
    width: 100%;
    color: red;
  }
`;
