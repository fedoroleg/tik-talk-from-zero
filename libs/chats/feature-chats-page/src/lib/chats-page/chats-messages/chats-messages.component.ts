import { Component, inject } from '@angular/core';
import { ChatsMessagesFeedComponent } from './chats-messages-feed/chats-messages-feed.component';
import { ChatsService } from '@tt/chats/data-access';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
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

  public chatVM$ = this.route.params.pipe(
    switchMap(({ id }) => this.chatsService.getChatByIdVM(id).pipe())
  );
  constructor() {
    this.route.params
      .pipe(
        switchMap(({ id }) =>
          this.chatsService
            .getChatByIdVM(id)
            .pipe
            // tap(chat => console.log('chatVM = ', chat))
            ()
        )
      )
      .subscribe((chatVM) => console.log('chatVM = ', chatVM));
  }
}
