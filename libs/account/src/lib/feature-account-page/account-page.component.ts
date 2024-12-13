import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AccountHeaderComponent } from '../../common-ui/account-header/account-header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AccountsService } from '../../data-access/services/account.service';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { PostsFeedComponent } from './posts-feed/posts-feed.component';
import { ChatsService } from '../../data-access/services/chats.service';

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
