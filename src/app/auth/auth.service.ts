import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environments } from "../environments/environments";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LoginData, TokenResponse } from "./auth.models";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient)
  private readonly cookieService = inject(CookieService)

  public accessToken: string | null = null
  public refreshToken: string | null = null

  get isLoggedIn() {
    if(!this.accessToken) {
      this.accessToken = this.cookieService.get('accessToken')
    }
    return Boolean(this.accessToken)
  } 

  login(loginData: LoginData) {
    const{ username, password } = loginData
    
    let fd = new FormData()
    fd.append('username', username)
    fd.set('password', password)

    console.log('loginFormData', fd);
    
    return this.http.post<TokenResponse>(`${environments.api_url}auth/token`, fd).pipe(
      tap(response => {
        this.accessToken = response.access_token
        this.refreshToken = response.refresh_token
        
        this.cookieService.set('accessToken', this.accessToken)
        this.cookieService.set('refreshToken', this.refreshToken)
      })
    )
  }
}