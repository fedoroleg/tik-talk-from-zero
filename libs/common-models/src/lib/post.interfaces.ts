import { Account } from './account.interface';

export type PostCreateDTO = {
  title: string;
  content: string;
  authorId: number;
  communityId: number;
};

export interface Post {
  id: number;
  title: string;
  content: string;
  author: Account;
  images: string[];
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  text: string;
  author: {
    id: 0;
    username: string;
    avatarUrl: string;
    subscribersAmount: 0;
  };
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCreateDto {
  text: string;
  authorId: number;
  postId: number;
  commentId: number;
}
