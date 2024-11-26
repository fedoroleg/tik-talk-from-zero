import { Component, inject } from '@angular/core';
import { ChatsMessagesHeaderComponent } from "./chats-messages-header/chats-messages-header.component";
import { ChatsMessagesFeedComponent } from "./chats-messages-feed/chats-messages-feed.component";
import { ChatsService } from '../../../data-access/services/chats.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chats-messages',
  standalone: true,
  imports: [ChatsMessagesHeaderComponent, ChatsMessagesFeedComponent, AsyncPipe],
  templateUrl: './chats-messages.component.html',
  styleUrl: './chats-messages.component.scss'
})
export class ChatsMessagesComponent {
  private readonly chatsService = inject(ChatsService)
  private readonly route = inject(ActivatedRoute)

  public chat$ = this.route.params.pipe(
    switchMap(({id}) => this.chatsService.getChatById(id)),
    tap(chat => console.log('chat', chat))
  )


}
