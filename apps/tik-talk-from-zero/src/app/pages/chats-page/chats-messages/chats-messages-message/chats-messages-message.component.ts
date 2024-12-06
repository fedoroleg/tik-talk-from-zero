import { Component, HostBinding, Input } from '@angular/core';
import { Message } from '../../../../data-access/interfaces/chats.interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chats-messages-message',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './chats-messages-message.component.html',
  styleUrl: './chats-messages-message.component.scss',
})
export class ChatsMessagesMessageComponent {
  @Input() message!: Message;

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message.isMine;
  }
}
