import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal} from '@angular/core';
import { Account } from '../interfaces/account.interface';
import { environments } from '../../environments/environments';
import { Pageble } from '../interfaces/pageble.type';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private readonly http = inject(HttpClient)

  public me = signal<Account | null>(null) 
  public value$ = new BehaviorSubject<string>('строка вот тут')

  public getMe() {
    return this.http.get<Account>(`${environments.api_url}account/me`).pipe(
      tap(res => this.me.set(res))
    )
  }

  public getTestAccounts() {
    return this.http.get<Account[]>(`${environments.api_url}account/test_accounts`)
  }

  public getAccount(id: number) {
    return this.http.get<Account>(`${environments.api_url}account/${id}`)
  }

  public getSubscribersShortList(amount: number) {
    return this.http.get<Pageble<Account>>(`${environments.api_url}account/subscribers/?page=1&size=50`).pipe(
      map(res => res.items.slice(0, amount))
    )
  }

  public patchAccount(account: Partial<Account>) {  
    return this.http.patch<Account>(`${environments.api_url}account/me`, account)
  }

  public uploadAvatar(avatar: File) {
    const fd = new FormData()
    fd.append('image', avatar)
    return this.http.post<Account>(`${environments.api_url}account/upload_image`, fd)
  }

  public filterAccounts(params: Record<string, any>) {
    console.log('params in service get == ', params );
    
    // return this.http.get<Pageble<Account>>(`${environments.api_url}account/accounts`)
  }
}
