import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { ChatsMessageInputComponent } from '../chats-message-input/chats-message-input.component';
import { Chat, ChatVM } from '@tt/common-models';
import { ChatsService } from '@tt/chats/data-access';
import { firstValueFrom } from 'rxjs';
import { ChatsMessagesHeaderComponent } from '../chats-messages-header/chats-messages-header.component';
import { ChatsMessagesDateGroupComponent } from '../chats-messages-date-group/chats-messages-date-group.component';

@Component({
  selector: 'app-chats-messages-feed',
  standalone: true,
  imports: [
    ChatsMessageInputComponent,
    ChatsMessagesHeaderComponent,
    ChatsMessagesDateGroupComponent,
  ],
  templateUrl: './chats-messages-feed.component.html',
  styleUrl: './chats-messages-feed.component.scss',
})
export class ChatsMessagesFeedComponent {
  private readonly chatsService = inject(ChatsService);
  public readonly messagesDateGroups = this.chatsService.activeChatMessages;
  @Input() chat!: Chat;

  @ViewChild('messages') private myScrollContainer!: ElementRef;

  async onSendMessage(message: string) {
    await firstValueFrom(
      this.chatsService.sendMessage(this.chat.id, message)
    ).then((res) => console.log('res', res));

    await firstValueFrom(this.chatsService.getChatByIdVM(this.chat.id));
    // await firstValueFrom(this.chatsService.getChatById(this.chatVM.id)).then(updatedChat => {
    //   this.chatVM = updatedChat
    // //.this.scrollToBottom()
    // })
  }

  scrollToBottom(): void {
    console.log('scrollToBootom run = ', this.myScrollContainer);
  }
}
