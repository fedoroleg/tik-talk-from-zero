import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { ChatsMessageInputComponent } from "../chats-message-input/chats-message-input.component";
import { Chat, ChatVM } from '../../../../data-access/interfaces/chats.interfaces';
import { ChatsService } from '../../../../data-access/services/chats.service';
import { firstValueFrom } from 'rxjs';
import { ChatsMessagesHeaderComponent } from "../chats-messages-header/chats-messages-header.component";
import { ChatsMessagesDateGroupComponent } from "../chats-messages-date-group/chats-messages-date-group.component";

@Component({
  selector: 'app-chats-messages-feed',
  standalone: true,
  imports: [ ChatsMessageInputComponent, ChatsMessagesHeaderComponent, ChatsMessagesDateGroupComponent],
  templateUrl: './chats-messages-feed.component.html',
  styleUrl: './chats-messages-feed.component.scss'
})
export class ChatsMessagesFeedComponent {
  private readonly chatsService = inject(ChatsService)
  @Input() chatVM!: ChatVM

  @ViewChild('messages') private myScrollContainer!: ElementRef;

  async onSendMessage(message: string) {
    await firstValueFrom(this.chatsService.sendMessage(this.chatVM.id, message)).then(res => console.log('res', res)
    )
    // await firstValueFrom(this.chatsService.getChatById(this.chatVM.id)).then(updatedChat => {
    //   this.chatVM = updatedChat
    // //.this.scrollToBottom()
    // })
  }

  scrollToBottom(): void {
    console.log('scrollToBootom run = ', this.myScrollContainer);
  }
}