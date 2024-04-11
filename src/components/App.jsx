import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

import Theme from './Theme';
import GlobalStyle from '../styles/GlobalStyle';

function App({ children }) {
  return (
    <Theme>
      <GlobalStyle />
      <Header />
      <Outlet />
      {children}
      <Footer />
    </Theme>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
