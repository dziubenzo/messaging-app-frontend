import styled from 'styled-components';

export const StyledHomePage = styled.main`
  width: 400px;
  background-color: ${(props) => props.theme.colours.bgSecondary};
  border: 2px solid ${(props) => props.theme.colours.primary};

  @media (width <= ${(props) => props.theme.mobile}) {
    width: 100%;
  }
`;

export const TopBar = styled.div`
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
    text-align: center;
  }

  svg {
    margin-left: auto;
    fill: white;
    height: 22px;
    width: 22px;
    cursor: pointer;
  }
`;

export const ContactsBar = styled.div`
  display: flex;
  justify-content: start;
  gap: 16px;
  padding: 0.2em;
  border-bottom: 2px solid ${(props) => props.theme.colours.primary};

  .all-users,
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
      height: 32px;
      width: 32px;
    }

    p {
      font-size: ${(props) => props.theme.fontSizes.extraSmall};
    }
  }
`;

export const UsersList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledContact = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2em;

  img {
    width: 20px;
    height: 20px;
    margin-right: 0.2em;
  }

  .user-info {
    .username {
      font-size: ${(props) => props.theme.fontSizes.standard};
      font-weight: 800;
    }

    .text-status {
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
`;

export const BottomBar = styled.div`
  background-color: ${(props) => props.theme.colours.bgQuaternary};
  font-size: ${(props) => props.theme.fontSizes.small};
  border-top: 2px solid ${(props) => props.theme.colours.primary};
  border-bottom: 2px solid ${(props) => props.theme.colours.primary};
  padding: 0.2em;

  .text-status {
    margin-top: 1em;
    font-weight: 800;
  }
`;

export const StatusBar = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  background-color: ${(props) => props.theme.colours.bgPrimary};
  font-size: ${(props) => props.theme.fontSizes.small};
  padding: 0.2em;

  img {
    width: 18px;
    height: 18px;
  }

  svg {
    margin-left: auto;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;
