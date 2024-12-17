import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environments } from '@tt/environments';
import { authInterceptor } from '@tt/auth2';
import { API_URL } from '@tt/auth2';
import { accountsFeature } from '@tt/account';
import { accountEffects } from '@tt/account';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      [accountsFeature.name]: accountsFeature.reducer,
    }),
    provideEffects(accountEffects),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: API_URL,
      useValue: environments.api_url,
    },
  ],
};
