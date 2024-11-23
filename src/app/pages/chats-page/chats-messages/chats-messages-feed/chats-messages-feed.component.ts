import { Component } from '@angular/core';
import { ChatsMessagesMessageComponent } from "../chats-messages-message/chats-messages-message.component";

@Component({
  selector: 'app-chats-messages-feed',
  standalone: true,
  imports: [ChatsMessagesMessageComponent],
  templateUrl: './chats-messages-feed.component.html',
  styleUrl: './chats-messages-feed.component.scss'
})
export class ChatsMessagesFeedComponent {

}
