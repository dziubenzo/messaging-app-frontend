import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

import Theme from './Theme';
import GlobalStyle from '../styles/GlobalStyle';
import { useCheckRootAuth } from '../helpers';
import { useState } from 'react';

function App({ children }) {
  const [user, setUser] = useState({});
  useCheckRootAuth(setUser);

  return (
    <Theme>
      <GlobalStyle />
      <Header />
      <Outlet context={{ user, setUser }} />
      {children}
      <Footer />
    </Theme>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
