import PropTypes from 'prop-types';
import { Outlet, useNavigation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import LoadingPage from '../pages/LoadingPage';

import Theme from './Theme';
import GlobalStyle from '../styles/GlobalStyle';
import { useCheckRootAuth } from '../helpers';
import { useImmer } from 'use-immer';

function App({ children }) {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  const [user, setUser] = useImmer({});
  useCheckRootAuth(setUser);

  return (
    <Theme>
      <GlobalStyle />
      <Header />
      {isLoading ? <LoadingPage /> : <Outlet context={{ user, setUser }} />}
      {children}
      <Footer />
    </Theme>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
