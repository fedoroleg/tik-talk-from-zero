import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { environments } from '@tt/environments';
import { authInterceptor } from '@tt/auth2';
import { API_URL } from '@tt/auth2';
import { accountsFeature } from '@tt/account';
import { accountEffects } from '@tt/account';
import { postsFeature } from '@tt/posts';
import { postsEffects } from '@tt/posts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      [accountsFeature.name]: accountsFeature.reducer,
      [postsFeature.name]: postsFeature.reducer,
    }),
    provideEffects(accountEffects, postsEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: API_URL,
      useValue: environments.api_url,
    },
  ],
};
