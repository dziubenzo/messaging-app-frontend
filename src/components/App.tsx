import { ReactNode, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { STATUS_ICONS } from '../constants';
import GlobalStyle from '../styles/GlobalStyle';
import type { StatusIcon } from '../types';
import Footer from './Footer';
import Header from './Header';
import Theme from './Theme';

type AppProps = {
  children?: ReactNode;
};

function App({ children }: AppProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // State for storing user's previous status icon
  const [previousStatusIcon, setPreviousStatusIcon] = useState<StatusIcon>(
    STATUS_ICONS.unavailable,
  );

  useEffect(() => {
    if (pathname === '/') navigate('/home');
  }, [pathname, navigate]);

  return (
    <Theme>
      <GlobalStyle />
      <Header />
      <Outlet context={{ previousStatusIcon, setPreviousStatusIcon }} />
      {children}
      <Footer />
    </Theme>
  );
}

export default App;
