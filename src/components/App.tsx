import { Outlet, useNavigation } from 'react-router-dom';
import LoadingPage from '../pages/LoadingPage';
import Footer from './Footer';
import Header from './Header';

import { ReactNode, useState } from 'react';
import { useImmer } from 'use-immer';
import { statusIcons, useCheckRootAuth } from '../helpers';
import GlobalStyle from '../styles/GlobalStyle';
import type { StatusIcon, User } from '../types';
import Theme from './Theme';

type AppProps = {
  children?: ReactNode;
};

function App({ children }: AppProps) {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  const [user, setUser] = useImmer<User | null>(null);
  
  useCheckRootAuth(setUser);
  const [previousStatusIcon, setPreviousStatusIcon] = useState<StatusIcon>(
    statusIcons.unavailable,
  );

  if (!user) return;

  return (
    <Theme>
      <GlobalStyle />
      <Header />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Outlet
          context={{ user, setUser, previousStatusIcon, setPreviousStatusIcon }}
        />
      )}
      {children}
      <Footer />
    </Theme>
  );
}

export default App;
