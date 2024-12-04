import { Emoticon } from './types';

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
export const EMOTICONS: Emoticon[] = [
  { name: 'Smile Emoticon', url: 'http://emots.yetihehe.com/2/usmiech.gif' },
  { name: 'Wink Emoticon', url: 'http://emots.yetihehe.com/3/oczko2.gif' },
  { name: 'OK Emoticon', url: 'http://emots.yetihehe.com/3/ok2.gif' },
  { name: 'Grin Emoticon', url: 'http://emots.yetihehe.com/2/zeby.gif' },
  { name: 'Tongue Emoticon', url: 'http://emots.yetihehe.com/2/jezyk1.gif' },
  { name: 'Cunning Emoticon', url: 'http://emots.yetihehe.com/2/chytry.gif' },
  {
    name: 'Cunning Smile Emoticon',
    url: 'http://emots.yetihehe.com/3/krzywy.gif',
  },
  { name: 'Grimace Emoticon', url: 'http://emots.yetihehe.com/3/kwasny.gif' },
  { name: 'LOL Emoticon', url: 'http://emots.yetihehe.com/3/lol.gif' },
  { name: 'ROTFL Emoticon', url: 'http://emots.yetihehe.com/3/rotfl.gif' },
  {
    name: 'Loving Smile Emoticon',
    url: 'http://emots.yetihehe.com/3/serduszka.gif',
  },
  {
    name: 'Keep Tight Emoticon',
    url: 'http://emots.yetihehe.com/2/3m_sie.gif',
  },
  {
    name: 'Yay Emoticon',
    url: 'http://emots.yetihehe.com/2/jupi.gif',
  },
  {
    name: 'WOW Emoticon',
    url: 'http://emots.yetihehe.com/3/wow.gif',
  },
  {
    name: 'Question Mark Emoticon',
    url: 'http://emots.yetihehe.com/2/pytajnik.gif',
  },
  {
    name: 'Exclamation Mark Emoticon',
    url: 'http://emots.yetihehe.com/2/wykrzyknik.gif',
  },
  {
    name: 'Bang Your Head Against A Wall Emoticon',
    url: 'http://emots.yetihehe.com/2/sciana.gif',
  },
  {
    name: 'Typing Emoticon',
    url: 'http://emots.yetihehe.com/2/pisze.gif',
  },
  {
    name: 'Give Me A Hug Emoticon',
    url: 'http://emots.yetihehe.com/2/przytul.gif',
  },
  {
    name: 'Stamp Your Feet Emoticon',
    url: 'http://emots.yetihehe.com/3/tuptup.gif',
  },
  {
    name: 'Dance Emoticon',
    url: 'http://emots.yetihehe.com/2/tancze.gif',
  },
  {
    name: 'Beer Cheers Emoticon',
    url: 'http://emots.yetihehe.com/2/piwo.gif',
  },
] as const;
