import { User } from './user';
import { Comment } from './comment';
import { Like } from './like';

export type Post = {
  _id: string;
  user: User;
  comments: Comment[];
  likes: Like[];
  topic: string;
  category: string;
  image: string;
  content: string;
  createdAt: Date;
};
