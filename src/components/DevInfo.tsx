import { DiGithubBadge } from 'react-icons/di';
import { StyledDevInfo } from '../styles/HomePage.styled';

function DevInfo() {
  return (
    <StyledDevInfo>
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
    </StyledDevInfo>
  );
}

export default DevInfo;
