import type { Updater } from 'use-immer';
import { statusIcons } from './helpers';

export type StatusIcon = (typeof statusIcons)[keyof typeof statusIcons];

export type User = {
  _id: string;
  user_id: number;
  username: string;
  status_icon: StatusIcon;
  status_text: string;
  contacts: User['_id'][];
  _v?: string;
};

export type BottomBar = {
  id: User['_id'];
  status: User['status_text'];
};

export type OutletContext = {
  user: User | null;
  setUser: Updater<User | null>;
  previousStatusIcon: StatusIcon;
  setPreviousStatusIcon: React.Dispatch<React.SetStateAction<StatusIcon>>;
};
