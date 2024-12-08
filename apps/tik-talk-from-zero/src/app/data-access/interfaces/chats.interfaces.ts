import { Account } from './account.interface';

export interface Chat {
  id: number;
  userFirst: Account;
  userSecond: Account;
  messages: Message[];
  companion?: Account;
}

export interface ChatVM {
  id: number;
  userFirst: Account;
  userSecond: Account;
  messages: MessagesDateGroup[];
  companion?: Account;
}

export interface MessagesDateGroup {
  date: string;
  messages: Message[];
}

export interface Message {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt: string;
  user?: Account;
  isMine?: boolean;
}

export interface LastMessageRes {
  id: number;
  userFrom: Account;
  message: string | null;
  createdAt: string;
  unreadMessages: number;
}
