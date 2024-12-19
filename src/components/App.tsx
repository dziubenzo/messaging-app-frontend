import { ReactNode, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { useCheckAuth } from '../helpers';
import { socket } from '../socket';
import GlobalStyle from '../styles/GlobalStyle';
import Header from './Header';
import Theme from './Theme';

type AppProps = {
  children?: ReactNode;
};

function App({ children }: AppProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isAuth, setIsAuth, userId] = useCheckAuth();

  useEffect(() => {
    if (pathname === '/') navigate('/home');
  }, [pathname, navigate]);

  useEffect(() => {
    if (isAuth && userId) {
      socket.emit('user is authenticated', userId);
    } else if (!isAuth && userId) {
      socket.emit('user is not authenticated');
    }
  }, [isAuth, userId]);

  return (
    <Theme>
      <GlobalStyle />
      <Header />
      <Outlet
        context={{
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
