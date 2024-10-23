import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Account } from '../interfaces/account.interface';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private readonly http = inject(HttpClient)

  public getMe() {
    return this.http.get<Account>(`${environments.api_url}account/me`)
  }

  public getTestAccounts() {
    return this.http.get<Account[]>(`${environments.api_url}account/test_accounts`)
  }
}
