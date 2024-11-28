import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, tap } from "rxjs";

import { environments } from '../../environments/environments';
import { Chat, LastMessageRes, Message } from "../interfaces/chats.interfaces";
import { AccountsService } from "./account.service";

@Injectable({
  providedIn: "root"
})
export class ChatsService {
  private readonly http = inject(HttpClient)
  private readonly CHATS_URL = `${environments.api_url}chat`
  private readonly MESSAGE_URL = `${environments.api_url}message`
  private readonly accountService = inject(AccountsService)
  private readonly me = this.accountService.me

  public createChat(id: number) {
    return this.http.post<Chat>(`${this.CHATS_URL}/${id}`, {}).pipe(
      tap(res => console.log('new chat res in serv = ', res))
    )
  }

  public getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.CHATS_URL}/get_my_chats/`)
  }

  public getChatById(id: number) {
    return this.http.get<Chat>(`${this.CHATS_URL}/${id}`).pipe(
      map(chat => {
        return {
          ...chat,
          messages: chat.messages.map(message => {
            return {
              ...message,
              isMine: message.userFromId === this.me()?.id
            }
          })
          
        }
      })
    )
  }

  public sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(`${this.MESSAGE_URL}/send/${chatId}`, {}, {
      params: {
        message: message
      }
    })
  }
}