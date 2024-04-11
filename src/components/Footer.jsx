import { StyledFooter } from '../styles/App.styled';
import { DiGithubBadge } from 'react-icons/di';

function Footer() {
  return (
    <StyledFooter>
      <p>
        created by <span className="dev-name">dziubenzo</span>
      </p>
      <a
        href="https://github.com/dziubenzo/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Developer's GitHub page, opens in new tab"
      >
        <DiGithubBadge className="github-logo" />
      </a>
    </StyledFooter>
  );
}

export default Footer;
