import { StyledFooter } from '../styles/App.styled';
import { DiGithubBadge } from 'react-icons/di';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Zoom } from 'react-toastify';

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
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        closeButton={false}
        hideProgressBar={true}
        newestOnTop={true}
        theme="light"
        closeOnClick
        transition={Zoom}
      />
    </StyledFooter>
  );
}

export default Footer;
