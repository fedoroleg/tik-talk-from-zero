import { Component, Input } from '@angular/core';
import { Chat } from '../../../../data-access/interfaces/chats.interfaces';
import { AvatarCircleComponent } from "../../../../common-ui/avatar-circle/avatar-circle.component";

@Component({
  selector: 'app-chats-messages-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chats-messages-header.component.html',
  styleUrl: './chats-messages-header.component.scss'
})
export class ChatsMessagesHeaderComponent{
  @Input() chat!: Chat;
}
