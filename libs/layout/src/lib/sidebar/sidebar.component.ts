import { Component, inject, OnInit } from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { accountSelectors, AccountsService } from '@tt/account';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { accountsActions } from '@tt/account';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
    RouterLink,
    RouterLinkActive,
    SubscriberCardComponent,
    ImgUrlPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private readonly store = inject(Store)
  private readonly accountService = inject(AccountsService);

  public me$ = this.store.select(accountSelectors.selectMe)


  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: '/account/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: '/chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/search',
    },
  ];

  public readonly subscribers$ = this.accountService.getSubscribersShortList(3);

  ngOnInit() {
    this.store.dispatch(accountsActions.getMe())
    firstValueFrom(this.accountService.getMe());
  }
}
