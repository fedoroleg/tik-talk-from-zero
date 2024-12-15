import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';

import { environments } from '@tt/environments';
import {
  Chat,
  ChatVM,
  LastMessageRes,
  Message,
  MessagesDateGroup,
} from '@tt/common-models';
import { AccountsService } from '@tt/account';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private readonly http = inject(HttpClient);
  private readonly CHATS_URL = `${environments.api_url}chat`;
  private readonly MESSAGE_URL = `${environments.api_url}message`;
  private readonly accountService = inject(AccountsService);
  private readonly me = this.accountService.me;
  public activeChatMessages = signal<MessagesDateGroup[] | null>(null)

  public createChat(id: number) {
    return this.http
      .post<Chat>(`${this.CHATS_URL}/${id}`, {})
      .pipe(tap((res) => console.log('new chat res in serv = ', res)));
  }

  public getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.CHATS_URL}/get_my_chats/`);
  }

  public getChatByIdVM(id: number) {
    return this.http.get<Chat>(`${this.CHATS_URL}/${id}`).pipe(
      tap((chat) => {
        this.activeChatMessages.set(this.getMessagesDateGroups(chat.messages))
      })
      // map((chat) => {
      //   return {
      //     ...chat,
      //     messages: this.getMessagesDateGroups(chat.messages),
      //   };
      // }),
      // tap(chatVM => {
      //   this.activeChatMessages.set(chatVM.messages)
      // })
    );
  }

  public sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(
      `${this.MESSAGE_URL}/send/${chatId}`,
      {},
      {
        params: {
          message: message,
        },
      }
    );
  }

  private setIsMineForMessage(message: Message) {
    return {
      ...message,
      isMine: message.userFromId === this.me()?.id,
    };
  }

  private getMessagesDateGroups(messages: Message[]): MessagesDateGroup[] {
    const dateGroups: MessagesDateGroup[] = [];

    messages.forEach((message) => {
      message = this.setIsMineForMessage(message);
      const messageDate = getMessageDate(message.createdAt);
      const dateGroupExist = dateGroups.find(
        (dateGroup) => dateGroup.date === messageDate
      );

      if (dateGroupExist) {
        dateGroupExist.messages.push(message);
      }

      if (!dateGroupExist) {
        dateGroups.push({ date: messageDate, messages: [message] });
      }
    });

    return dateGroups;
  }
}

function getMessageDate(date: string) {
  const today = new Date().toLocaleDateString();
  const yesterday = getYesterday();
  const messageDate = new Date(date).toLocaleDateString();

  if (messageDate === today) return 'Сегодня';
  if (messageDate === yesterday) return 'Вчера';
  return messageDate;
}

function getYesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toLocaleDateString();
}
