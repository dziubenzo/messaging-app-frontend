import styled from 'styled-components';

export const StyledForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  button[type='submit'] {
    width: 125px;
    padding: 0.3em;
    font-size: ${(props) => props.theme.fontSizes.standard};
    cursor: pointer;
  }
`;

export const StyledNameInputField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  label {
    cursor: pointer;
  }

  input {
    font-size: ${(props) => props.theme.fontSizes.standard};
    padding: 0.3em;
    text-align: center;
  }
`;

export const StyledContacts = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  label {
    cursor: pointer;
  }

  input {
    accent-color: ${(props) => props.theme.colours.bgPrimary};
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

export const StyledContactCheckbox = styled.div`
  display: flex;
  gap: 12px;
`;
