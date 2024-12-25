import { Component, inject, OnInit } from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { accountsSelectors } from '@tt/accounts/data-access';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { accountsActions } from '@tt/accounts/data-access';

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
  private readonly store = inject(Store);

  public me$ = this.store.select(accountsSelectors.selectMe);

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

  public readonly subscribers$ = this.store.select(
    accountsSelectors.selectSubscribers
  );

  ngOnInit() {
    this.store.dispatch(accountsActions.getMe());
  }
}
