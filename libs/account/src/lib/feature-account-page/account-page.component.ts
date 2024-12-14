import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AccountHeaderComponent } from '@tt/common-ui';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AccountsService } from '../data-access/account.service';
import { SvgIconComponent } from '@tt/common-ui';
import { ImgUrlPipe } from '@tt/common-ui';
import { PostsFeedComponent } from '@tt/posts';
import { ChatsService } from '@tt/chats/data-access';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [
    AccountHeaderComponent,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    ImgUrlPipe,
    PostsFeedComponent,
  ],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss',
})
export class AccountPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountsService);
  private readonly chatsService = inject(ChatsService);

  me$ = toObservable(this.accountService.me);
  public isMyPage = signal(false);

  public readonly subscribers$ = this.accountService.getSubscribersShortList(5);

  public readonly account$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me');
      if (id === 'me') {
        return this.me$;
      }

      return this.accountService.getAccount(id);
    })
  );

  sendMessage(id: number) {
    firstValueFrom(this.chatsService.createChat(id)).then((chat) =>
      this.router.navigate(['chats', chat.id])
    );
  }
}
