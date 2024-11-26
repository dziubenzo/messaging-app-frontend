import 'styled-components';
import { ThemeObject } from './components/Theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeObject {}
}
