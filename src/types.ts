import type { Updater } from 'use-immer';
import { STATUS_ICONS } from './constants';

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

export type StatusIcon = (typeof STATUS_ICONS)[keyof typeof STATUS_ICONS];

export type BottomBar = {
  id: User['user_id'];
  status: User['status_text'];
};

export type Emoticon = {
  title: string;
  url: string;
};

export type OutletContext = {
  user: User;
  setUser: Updater<User>;
  allUsersFiltered: User[];
  setBottomBarText: React.Dispatch<React.SetStateAction<BottomBar>>;
  groupChats: GroupChat[];
  setGroupChats: Updater<GroupChat[]>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

export type HeaderBody =
  | UpdateOptionsBody
  | MessageBody
  | GroupChatMessageBody
  | LogInBody
  | RegisterUserBody
  | UpdateIconBody
  | UpdateContactBody
  | NewChatBody;

type UpdateOptionsBody = {
  current_username: User['username'];
  username: User['username'];
  status_text: User['status_text'];
};

type MessageBody = {
  sender: User['_id'];
  text: Message['text'];
};

type GroupChatMessageBody = {
  sender: User['_id'];
  recipient: User['_id'];
  text: Message['text'];
};

type LogInBody = {
  username: User['username'];
  password: string;
};

type RegisterUserBody = LogInBody & { confirm_password: string };

type UpdateIconBody = {
  image_url: StatusIcon;
};

type UpdateContactBody = {
  contact_id: User['_id'];
};

type NewChatBody = {
  name: GroupChat['name'];
  created_by: GroupChat['created_by'];
  members: User['_id'][];
};
