import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

import Theme from './Theme';
import GlobalStyle from '../styles/GlobalStyle';
import { useCheckRootAuth, useChangeStatusIcon, statusIcons } from '../helpers';
import { useState } from 'react';

function App({ children }) {
  const [user, setUser] = useState({});
  useCheckRootAuth(setUser);

  // Change user's status icon to unavailable on unload
  useChangeStatusIcon('beforeunload', user, statusIcons.unavailable);

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
