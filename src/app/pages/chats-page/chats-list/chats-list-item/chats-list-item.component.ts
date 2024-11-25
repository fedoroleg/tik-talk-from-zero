import { Component } from '@angular/core';
import { AvatarCircleComponent } from "../../../../common-ui/avatar-circle/avatar-circle.component";

@Component({
  selector: 'app-chats-list-item',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chats-list-item.component.html',
  styleUrl: './chats-list-item.component.scss'
})
export class ChatsListItemComponent {

}
