import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { LoginData, TokenResponse } from './auth.models';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  public accessToken: string | null = null;
  public refreshToken: string | null = null;

  public get isLoggedIn() {
    if (!this.accessToken && !this.refreshToken) {
      this.accessToken = this.cookieService.get('accessToken');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return Boolean(this.accessToken);
  }

  public login(loginData: LoginData) {
    const { username, password } = loginData;
    let fd = new FormData();
    fd.append('username', username);
    fd.set('password', password);
    return this.http
      .post<TokenResponse>(`${environments.api_url}auth/token`, fd)
      .pipe(tap((response) => this.saveTokens(response)));
  }

  public refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${environments.api_url}auth/refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((res) => this.saveTokens(res)),
        catchError((error) => {
          console.log('error in refreshAuthToken ', error);
          this.logout();
          return throwError(error);
        })
      );
  }

  private logout() {
    this.cookieService.deleteAll();
    this.accessToken = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  private saveTokens(res: TokenResponse) {
    this.accessToken = res.access_token;
    this.refreshToken = res.refresh_token;

    this.cookieService.set('accessToken', this.accessToken);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
}
