import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';

import { isLoggedInGuardFn } from './auth/is-logged-in.guard';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ChatsPageComponent } from './pages/chats-page/chats-page.component';
import { chatsRoutes } from './pages/chats-page/chats.routes';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'account/me', pathMatch: 'full'},
      { path: 'account/:id', component: AccountPageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'search', component: SearchPageComponent},
      { path: 'chats', loadChildren: () => chatsRoutes},
    ],
    canActivate: [isLoggedInGuardFn]
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },

  {
    path: 'test',
    component: TestPageComponent,
  }
];
