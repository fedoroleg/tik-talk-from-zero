import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Account } from '../interfaces/account.interface';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  http = inject(HttpClient)

  getTestAccounts() {
    return this.http.get<Account[]>(`${environments.api_url}account/test_accounts`)
  }
}
