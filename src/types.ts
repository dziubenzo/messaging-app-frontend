import type { Updater } from 'use-immer';
import { statusIcons } from './helpers';

export type StatusIcon = (typeof statusIcons)[keyof typeof statusIcons];

export type User = {
  _id: string;
  user_id: number;
  username: string;
  status_icon: StatusIcon;
  status_text: string;
  contacts: User[];
  _v?: string;
};

export type BottomBarType = {
  id: User['user_id'];
  status: User['status_text'];
};

export type AppOutletContext = {
  user: User;
  setUser: Updater<User | null>;
  previousStatusIcon: StatusIcon;
  setPreviousStatusIcon: React.Dispatch<React.SetStateAction<StatusIcon>>;
};

export type HomePageOutletContext = {
  user: User;
  setUser: Updater<User | null>;
  allUsersFiltered: User[];
  contacts: User['contacts'];
  setBottomBarText: React.Dispatch<React.SetStateAction<BottomBarType>>;
};
