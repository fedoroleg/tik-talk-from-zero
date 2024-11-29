import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, tap } from "rxjs";

import { environments } from '../../environments/environments';
import { Chat, ChatVM, LastMessageRes, Message, MessagesDateGroup } from "../interfaces/chats.interfaces";
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

  public getChatByIdVM(id: number) {
    return this.http.get<Chat>(`${this.CHATS_URL}/${id}`).pipe(
      map(chat => {
        return {
          ...chat,
          messages: this.getMessagesDateGroups(chat.messages)
        }
      }),
    )
  }



  //Работающая старая версия
  
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
      }),
    )
  }

  public sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(`${this.MESSAGE_URL}/send/${chatId}`, {}, {
      params: {
        message: message
      }
    })
  }

  private getMessagesDateGroups(messages: Message[]): MessagesDateGroup[] {
    const today = new Date().toLocaleDateString()
    // let dateGroups = [ {date: '01.01.2024', messages: []}, {date: '25.11.2024', messages: [{},]}]
    let dateGroups: MessagesDateGroup[] = []
  
    messages.forEach(message => {
      // console.log('today = ', today);
      // console.log('message.createdAt = ', new Date(message.createdAt).toLocaleDateString() === today);
  
      // Дальше для каждого месседжа делаю эти операции
      message = this.setIsMineForMessage(message)
      const messageDate = new Date(message.createdAt).toLocaleDateString()
  
      const dateGroupExist = dateGroups.find(dateGroup => dateGroup.date === messageDate)
  
      if (dateGroupExist) {     
        dateGroupExist.messages.push(message)
      }
  
      if (!dateGroupExist) {
        dateGroups.push({date: messageDate, messages: [message]})
      }
  
    });
  
    return dateGroups
  }

  private setIsMineForMessage (message: Message) {
    return {
      ...message,
      isMine: message.userFromId === this.me()?.id
    }
  }
} 