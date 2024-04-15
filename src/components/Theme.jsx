import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

const darkTheme = {
  colours: {
    bgPrimary: '#ff7f3f',
    bgSecondary: '#ffff9b',
    bgTertiary: '#e7e783',
    bgQuaternary: '#ffffe1',
    bgSelected: '#0a246a',
    primary: '#000000',
    topBar: '#0153e4',
  },
  fontSizes: {
    extraSmall: '0.7rem',
    small: '0.8rem',
    standard: '1.0rem',
    medium: '1.2rem',
    large: '1.5rem',
    extraLarge: '2rem',
  },
  fonts: {
    primary: '"Microsoft Sans Serif", sans-serif',
    secondary: '"Fugaz One", sans-serif',
  },
  mobile: '768px',
};

export default function Theme({ children }) {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}

Theme.propTypes = {
  children: PropTypes.node,
};
