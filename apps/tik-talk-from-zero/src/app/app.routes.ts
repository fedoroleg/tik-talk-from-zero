import { Routes } from '@angular/router';
import { LoginPageComponent } from '@tt/auth2';
import { SearchPageComponent } from '@tt/accounts/accounts-pages';
import { LayoutComponent } from '@tt/layout';
import { isLoggedInGuardFn } from '@tt/auth2';
import { AccountPageComponent } from '@tt/accounts/accounts-pages';
import { SettingsPageComponent } from '@tt/accounts/accounts-pages';
import { chatsRoutes } from '@tt/chats/feature-chats-page';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'account/me', pathMatch: 'full' },
      { path: 'account/:id', component: AccountPageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'chats', loadChildren: () => chatsRoutes },
    ],
    canActivate: [isLoggedInGuardFn],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
