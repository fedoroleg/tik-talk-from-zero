import { Component, inject } from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { ChatsListItemComponent } from "./chats-list-item/chats-list-item.component";
import { ChatsService } from '../../../data-access/services/chats.service';
import { Chat, LastMessageRes } from '../../../data-access/interfaces/chats.interfaces';


@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [ChatsListItemComponent, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {
  private readonly chatsService = inject(ChatsService)

  public chats$ = this.chatsService.getMyChats()

  constructor() {
    this.chats$.subscribe(res => {
      console.log('runs');
      console.log(res)}
    )
  }
}