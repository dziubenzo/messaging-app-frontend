import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { useCheckAuth } from '../helpers';
import { useGoOnlineOrOffline, useReconnect } from '../socket';
import GlobalStyle from '../styles/GlobalStyle';
import Header from './Header';
import Theme from './Theme';

type AppProps = {
  children?: ReactNode;
};

function App({ children }: AppProps) {
  const [isAuth, setIsAuth, userId] = useCheckAuth();

  // Manage user going online/offline
  useGoOnlineOrOffline(isAuth, userId);
  // Manage user reconnections
  useReconnect(isAuth, userId);

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
