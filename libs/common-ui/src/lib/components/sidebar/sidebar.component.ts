import { Component, inject, OnInit } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
//circullar
import { AccountsService } from '@tt/account';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
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
  private readonly accountService = inject(AccountsService);

  public me = this.accountService.me;

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
    firstValueFrom(this.accountService.getMe());
  }
}
