import { Component, Input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { LastMessageRes } from '@tt/common-models';
import { CustomDate } from '@tt/common-ui';

@Component({
  selector: 'app-chats-list-item',
  standalone: true,
  imports: [AvatarCircleComponent, CustomDate],
  templateUrl: './chats-list-item.component.html',
  styleUrl: './chats-list-item.component.scss',
})
export class ChatsListItemComponent {
  @Input() chat!: LastMessageRes;
}
