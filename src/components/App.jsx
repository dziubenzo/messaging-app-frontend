import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

import Theme from './Theme';
import GlobalStyle from '../styles/GlobalStyle';
import { useCheckAuth } from '../helpers';
import { useState } from 'react';

function App({ children }) {
  const [userId, setUserId] = useState('');
  useCheckAuth(setUserId);

  return (
    <Theme>
      <GlobalStyle />
      <Header />
      <Outlet context={{ userId, setUserId }} />
      {children}
      <Footer />
    </Theme>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
