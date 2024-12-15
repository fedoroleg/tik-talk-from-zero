import { Route } from '@angular/router';
import { ChatsPageComponent } from './chats-page.component';
import { ChatsMessagesComponent } from './chats-messages/chats-messages.component';

export const chatsRoutes: Route[] = [
  {
    path: '',
    component: ChatsPageComponent,
    children: [
      {
        path: ':id',
        component: ChatsMessagesComponent,
      },
    ],
  },
];
 