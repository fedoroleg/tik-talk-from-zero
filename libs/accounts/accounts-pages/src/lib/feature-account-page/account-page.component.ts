import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AccountHeaderComponent } from '@tt/common-ui';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { accountsActions, accountsSelectors } from '@tt/accounts/data-access';
import { SvgIconComponent } from '@tt/common-ui';
import { ImgUrlPipe } from '@tt/common-ui';
import { PostsFeedComponent } from '@tt/posts';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [
    CommonModule,
    AccountHeaderComponent,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    ImgUrlPipe,
    PostsFeedComponent,
  ],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  me$ = this.store.select(accountsSelectors.selectMe);
  public isMyPage = signal(false);

  constructor() {
    this.store.dispatch(accountsActions.getSubscribers())
  }

  public readonly subscribers$ = this.store.select(accountsSelectors.selectSubscribers)

  public readonly account$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me');
      if (id === 'me') {
        return this.me$;
      }

      return this.store.select(accountsSelectors.selectAccount);
    })
  );

  sendMessage(userId: number) {
      this.router.navigate(['/chats', 'new'], {queryParams: {userId}})
   }
}
