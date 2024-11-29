import type { Updater } from 'use-immer';
import { statusIcons } from './helpers';

export type User = {
  _id: string;
  user_id: number;
  username: string;
  status_icon: StatusIcon;
  status_text: string;
  contacts: User[];
  __v?: number;
};

export type Message = {
  _id: string;
  sender: User;
  recipient: User;
  text: string;
  date: Date;
  __v?: number;
};

export type GroupChat = {
  _id: string;
  name: string;
  created_by: User['_id'];
  members: GroupChatUser[];
  messages: GroupChatMessage[];
  __v?: number;
};

export type GroupChatMessage = {
  sender: GroupChatUser;
  text: string;
  date: Date;
};

export type GroupChatUser = Pick<User, '_id' | 'user_id' | 'username'>;

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
