import { Component, Input } from '@angular/core';
import { AvatarCircleComponent } from "../../../../common-ui/avatar-circle/avatar-circle.component";
import { LastMessageRes } from '../../../../data-access/interfaces/chats.interfaces';
import { CustomDate } from "../../../../helpers/pipes/custom-date.pipe";

@Component({
  selector: 'app-chats-list-item',
  standalone: true,
  imports: [AvatarCircleComponent, CustomDate],
  templateUrl: './chats-list-item.component.html',
  styleUrl: './chats-list-item.component.scss'
})
export class ChatsListItemComponent {
  @Input() chat!: LastMessageRes
} 
