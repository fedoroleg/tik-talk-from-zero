import { Component, Input } from '@angular/core';
import { MessagesDateGroup } from '../../../../data-access/interfaces/chats.interfaces';
import { ChatsMessagesMessageComponent } from "../chats-messages-message/chats-messages-message.component";

@Component({
  selector: 'app-chats-messages-date-group',
  standalone: true,
  imports: [ChatsMessagesMessageComponent],
  templateUrl: './chats-messages-date-group.component.html',
  styleUrl: './chats-messages-date-group.component.scss'
})
export class ChatsMessagesDateGroupComponent {
  @Input() messagesDateGroup!: MessagesDateGroup
}
