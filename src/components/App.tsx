import { ReactNode, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { STATUS_ICONS } from '../constants';
import { useCheckAuth } from '../helpers';
import GlobalStyle from '../styles/GlobalStyle';
import type { StatusIcon } from '../types';
import Header from './Header';
import Theme from './Theme';

type AppProps = {
  children?: ReactNode;
};

function App({ children }: AppProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isAuth, setIsAuth] = useCheckAuth();

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
      <Outlet
        context={{
          previousStatusIcon,
          setPreviousStatusIcon,
          isAuth,
          setIsAuth,
        }}
      />
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        closeButton={false}
        hideProgressBar={true}
        newestOnTop={true}
        theme="light"
        closeOnClick
        transition={Zoom}
      />
    </Theme>
  );
}

export default App;
