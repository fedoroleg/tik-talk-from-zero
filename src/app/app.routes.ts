import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';

import { isLoggedInGuardFn } from './auth/is-logged-in.guard';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [isLoggedInGuardFn],
    children: [
      {
        path: '',
        component: SearchPageComponent,
      },
      {
        path: 'account/:id',
        component: AccountPageComponent,
        canActivate: [isLoggedInGuardFn],
      },
    ]
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
