import { User } from './user';

export type Comment = {
  _id: string;
  author: User;
  content: string;
  created_at: Date;
};
