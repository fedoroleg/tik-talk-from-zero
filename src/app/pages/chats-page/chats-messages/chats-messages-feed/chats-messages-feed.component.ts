import { Component, Input } from '@angular/core';
import { ChatsMessagesMessageComponent } from "../chats-messages-message/chats-messages-message.component";
import { ChatsMessageInputComponent } from "../chats-message-input/chats-message-input.component";
import { Chat, Message } from '../../../../data-access/interfaces/chats.interfaces';

@Component({
  selector: 'app-chats-messages-feed',
  standalone: true,
  imports: [ChatsMessagesMessageComponent, ChatsMessageInputComponent],
  templateUrl: './chats-messages-feed.component.html',
  styleUrl: './chats-messages-feed.component.scss'
})
export class ChatsMessagesFeedComponent {
  @Input() messages!: Message[]
}
