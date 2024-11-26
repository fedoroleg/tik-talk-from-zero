import { Component } from '@angular/core';
import { ChatsMessagesMessageComponent } from "../chats-messages-message/chats-messages-message.component";
import { ChatsMessageInputComponent } from "../chats-message-input/chats-message-input.component";

@Component({
  selector: 'app-chats-messages-feed',
  standalone: true,
  imports: [ChatsMessagesMessageComponent, ChatsMessageInputComponent],
  templateUrl: './chats-messages-feed.component.html',
  styleUrl: './chats-messages-feed.component.scss'
})
export class ChatsMessagesFeedComponent {

}
