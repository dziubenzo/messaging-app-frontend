import { type ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { DARK_THEME } from '../constants';

export type ThemeObject = typeof DARK_THEME;

type ThemeProps = {
  children: ReactNode;
};

export default function Theme({ children }: ThemeProps) {
  return <ThemeProvider theme={DARK_THEME}>{children}</ThemeProvider>;
}
