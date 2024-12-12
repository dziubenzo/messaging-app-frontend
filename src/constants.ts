import { Emoticon } from './types';

// Theme
export const DARK_THEME = {
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
} as const;

// Status icons
export const STATUS_ICONS = {
  available:
    'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712917635/messaging_app/ryk3km39qhsbztiw6kmg.png',
  brb: 'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712917635/messaging_app/ow69aeyceffooc1prqsy.png',
  invisible:
    'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712917635/messaging_app/nm9jy0qklrrsmabibu75.png',
  unavailable:
    'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712917635/messaging_app/eegejkm8yz0f8qko0x1q.png',
  message:
    'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712917635/messaging_app/u21cswfqngpmklkfr3uh.png',
  availableMessage:
    'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712917635/messaging_app/m9ucqz7totsstdus4vtb.png',
} as const;

// Emoticons
export const EMOTICONS = {
  smile: {
    title: 'Smile Emoticon',
    url: 'http://emots.yetihehe.com/2/usmiech.gif',
  },
  wink: {
    title: 'Wink Emoticon',
    url: 'http://emots.yetihehe.com/3/oczko2.gif',
  },
  ok: { title: 'OK Emoticon', url: 'http://emots.yetihehe.com/3/ok2.gif' },
  grin: { title: 'Grin Emoticon', url: 'http://emots.yetihehe.com/2/zeby.gif' },
  tongue: {
    title: 'Tongue Emoticon',
    url: 'http://emots.yetihehe.com/2/jezyk1.gif',
  },
  cunning: {
    title: 'Cunning Emoticon',
    url: 'http://emots.yetihehe.com/2/chytry.gif',
  },
  cunningSmile: {
    title: 'Cunning Smile Emoticon',
    url: 'http://emots.yetihehe.com/3/krzywy.gif',
  },
  grimace: {
    title: 'Grimace Emoticon',
    url: 'http://emots.yetihehe.com/3/kwasny.gif',
  },
  lol: { title: 'LOL Emoticon', url: 'http://emots.yetihehe.com/3/lol.gif' },
  rotfl: {
    title: 'ROTFL Emoticon',
    url: 'http://emots.yetihehe.com/3/rotfl.gif',
  },

  lovingSmile: {
    title: 'Loving Smile Emoticon',
    url: 'http://emots.yetihehe.com/3/serduszka.gif',
  },
  keepTight: {
    title: 'Keep Tight Emoticon',
    url: 'http://emots.yetihehe.com/2/3m_sie.gif',
  },
  yay: {
    title: 'Yay Emoticon',
    url: 'http://emots.yetihehe.com/2/jupi.gif',
  },
  wow: {
    title: 'WOW Emoticon',
    url: 'http://emots.yetihehe.com/3/wow.gif',
  },
  questionMark: {
    title: 'Question Mark Emoticon',
    url: 'http://emots.yetihehe.com/2/pytajnik.gif',
  },
  exclamationMark: {
    title: 'Exclamation Mark Emoticon',
    url: 'http://emots.yetihehe.com/2/wykrzyknik.gif',
  },
  bangYourHead: {
    title: 'Bang Your Head Against A Wall Emoticon',
    url: 'http://emots.yetihehe.com/2/sciana.gif',
  },
  typing: {
    title: 'Typing Emoticon',
    url: 'http://emots.yetihehe.com/2/pisze.gif',
  },
  giveMeHug: {
    title: 'Give Me A Hug Emoticon',
    url: 'http://emots.yetihehe.com/2/przytul.gif',
  },
  stampYourFeet: {
    title: 'Stamp Your Feet Emoticon',
    url: 'http://emots.yetihehe.com/3/tuptup.gif',
  },
  dance: {
    title: 'Dance Emoticon',
    url: 'http://emots.yetihehe.com/2/tancze.gif',
  },
  beerCheers: {
    title: 'Beer Cheers Emoticon',
    url: 'http://emots.yetihehe.com/2/piwo.gif',
  },
} as const satisfies Record<string, Emoticon>;
