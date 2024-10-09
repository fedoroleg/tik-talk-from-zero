import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environments } from "../environments/environments";
import { tap } from "rxjs";
import { LoginData, TokenResponse } from "./auth.models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient)

  login(loginData: LoginData) {
    console.log('authService.login run');
    console.log('data username', loginData.username);
    console.log('data pass', loginData.password);

    const{ username, password } = loginData
    
    let fd = new FormData()
    fd.append('username', username)
    fd.set('password', password)

    console.log('loginFormData', fd);
    
    return this.http.post<TokenResponse>(`${environments.api_url}auth/token`, fd)
  }
}