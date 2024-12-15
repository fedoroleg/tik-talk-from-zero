import { Component, inject } from '@angular/core';
import { ChatsMessagesFeedComponent } from './chats-messages-feed/chats-messages-feed.component';
import { ChatsService } from '@tt/chats/data-access';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chats-messages',
  standalone: true,
  imports: [ChatsMessagesFeedComponent, AsyncPipe],
  templateUrl: './chats-messages.component.html',
  styleUrl: './chats-messages.component.scss',
})
export class ChatsMessagesComponent {
  private readonly chatsService = inject(ChatsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public activeChat$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'new') {
        return this.route.queryParams.pipe(
          filter(({ userId }) => userId),
          switchMap(({ userId }) => {
            return this.chatsService.createChat(userId).pipe(
              tap((chat) => {
                this.router.navigate(['chats', chat.id]);
              })
            );
          })
        );
      }
      return this.chatsService.getChatByIdVM(id);
    })
  );
}
