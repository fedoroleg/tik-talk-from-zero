import { Component } from '@angular/core';
import { ChatsMessagesHeaderComponent } from "./chats-messages-header/chats-messages-header.component";
import { ChatsMessagesFeedComponent } from "./chats-messages-feed/chats-messages-feed.component";

@Component({
  selector: 'app-chats-messages',
  standalone: true,
  imports: [ChatsMessagesHeaderComponent, ChatsMessagesFeedComponent],
  templateUrl: './chats-messages.component.html',
  styleUrl: './chats-messages.component.scss'
})
export class ChatsMessagesComponent {

}
