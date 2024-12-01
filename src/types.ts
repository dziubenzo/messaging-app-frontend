import type { Updater } from 'use-immer';
import { statusIcons } from './helpers';

export type User = {
  _id: string;
  user_id: number;
  username: string;
  status_icon: StatusIcon;
  status_text: string;
  contacts: User[];
  __v?: string;
};

export type Message = {
  _id: string;
  sender: User;
  recipient: User;
  text: string;
  date: Date;
  __v?: string;
};

export type GroupChat = {
  _id: string;
  name: string;
  created_by: string;
  members: User[];
  messages: GroupChatMessage[];
  __v?: string;
};

export type GroupChatMessage = {
  sender: User;
  text: string;
  date: Date;
};

export type StatusIcon = (typeof statusIcons)[keyof typeof statusIcons];

export type BottomBar = {
  id: User['user_id'];
  status: User['status_text'];
};

export type OutletContext = {
  user: User;
  setUser: Updater<User>;
  allUsersFiltered: User[];
  contacts: User['contacts'];
  setBottomBarText: React.Dispatch<React.SetStateAction<BottomBar>>;
  previousStatusIcon: StatusIcon;
  setPreviousStatusIcon: React.Dispatch<React.SetStateAction<StatusIcon>>;
};
