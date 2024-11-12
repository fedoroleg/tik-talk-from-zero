import { Component, inject, signal } from '@angular/core';
import {AsyncPipe} from '@angular/common';
import { AccountHeaderComponent } from "../../common-ui/account-header/account-header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AccountsService } from '../../data-access/services/account.service';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component'
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { PostsFeedComponent } from "./posts-feed/posts-feed.component";

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [AccountHeaderComponent, AsyncPipe, RouterLink, SvgIconComponent, ImgUrlPipe, PostsFeedComponent],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss'
})
export class AccountPageComponent {
  private readonly route = inject(ActivatedRoute)
  private readonly accountService = inject(AccountsService)

  me$ = toObservable(this.accountService.me)
  public isMyPage = signal(false)

  public readonly subscribers$ = this.accountService.getSubscribersShortList(5)

  public readonly account$ = this.route.params.pipe(
    switchMap(({id}) => {
      this.isMyPage.set(id === 'me')
      if (id === 'me') {
        return this.me$
      }

      return this.accountService.getAccount(id)
    })
  )
}
