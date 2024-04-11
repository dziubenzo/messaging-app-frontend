import styled from 'styled-components';

export const StyledHeader = styled.header`
  transform: rotate(-4deg);

  .app-name {
    font-family: ${(props) => props.theme.fonts.secondary};
    font-size: 3em;
    font-weight: 400;
    text-align: center;
  }
`;

export const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;

  .dev-name {
    font-weight: 600;
    letter-spacing: 1px;
  }

  .github-logo {
    height: 48px;
    width: 48px;
  }
`;
