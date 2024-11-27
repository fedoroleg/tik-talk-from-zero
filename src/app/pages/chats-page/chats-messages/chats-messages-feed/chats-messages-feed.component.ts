import { Component, inject, Input } from '@angular/core';
import { ChatsMessagesMessageComponent } from "../chats-messages-message/chats-messages-message.component";
import { ChatsMessageInputComponent } from "../chats-message-input/chats-message-input.component";
import { Chat } from '../../../../data-access/interfaces/chats.interfaces';
import { ChatsService } from '../../../../data-access/services/chats.service';
import { firstValueFrom } from 'rxjs';
import { ChatsMessagesHeaderComponent } from "../chats-messages-header/chats-messages-header.component";

@Component({
  selector: 'app-chats-messages-feed',
  standalone: true,
  imports: [ChatsMessagesMessageComponent, ChatsMessageInputComponent, ChatsMessagesHeaderComponent],
  templateUrl: './chats-messages-feed.component.html',
  styleUrl: './chats-messages-feed.component.scss'
})
export class ChatsMessagesFeedComponent {
  private readonly chatsService = inject(ChatsService)
  @Input() chat!: Chat

  async onSendMessage(message: string) {
    await firstValueFrom(this.chatsService.sendMessage(this.chat.id, message)).then(res => console.log('res', res)
    )
    await firstValueFrom(this.chatsService.getChatById(this.chat.id)).then(updatedChat => {
      this.chat = updatedChat
    })
  }
}