import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

const darkTheme = {
  colours: {
    background: '#0C0C0C',
    primary: '#F2613F',
    secondary: '#9B3922',
    tertiary: '#481E14',
  },
  fontSizes: {
    small: '0.8rem',
    medium: '1.2rem',
    large: '1.5rem',
    extraLarge: '2rem',
  },
};

export default function Theme({ children }) {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}

Theme.propTypes = {
  children: PropTypes.node,
};
