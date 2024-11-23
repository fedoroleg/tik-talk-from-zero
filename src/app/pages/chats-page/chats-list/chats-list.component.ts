import { Component } from '@angular/core';
import { ChatsListItemComponent } from "./chats-list-item/chats-list-item.component";

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [ChatsListItemComponent],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {

}
