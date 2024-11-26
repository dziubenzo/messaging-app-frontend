import { statusIcons } from './helpers';

export type StatusIcon = (typeof statusIcons)[keyof typeof statusIcons];

export type User = {
  _id: string;
  user_id: number;
  status_icon: StatusIcon;
  status_text: string;
  contacts: User['_id'][];
  _v?: string;
};
