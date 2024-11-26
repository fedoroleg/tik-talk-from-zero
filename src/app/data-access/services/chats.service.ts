import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environments } from '../../environments/environments';
import { Chat, LastMessageRes } from "../interfaces/chats.interfaces";
import { map } from "rxjs";
import { AccountsService } from "./account.service";

@Injectable({
  providedIn: "root"
})
export class ChatsService {
  private readonly http = inject(HttpClient)
  private readonly CHATS_URL = `${environments.api_url}chat`
  private readonly accountService = inject(AccountsService)
  private readonly me = this.accountService.me

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
}