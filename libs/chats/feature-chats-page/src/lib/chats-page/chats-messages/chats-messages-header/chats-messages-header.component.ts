import { Component, Input } from '@angular/core';
import {
  Chat,
  ChatVM,
} from '@tt/common-models';
import { AvatarCircleComponent } from '@tt/common-ui';

@Component({
  selector: 'app-chats-messages-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chats-messages-header.component.html',
  styleUrl: './chats-messages-header.component.scss',
})
export class ChatsMessagesHeaderComponent {
  @Input() chat!: Chat;
}
