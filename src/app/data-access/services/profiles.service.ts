import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  http = inject(HttpClient)

  getTestProfiles() {
    return this.http.get<Profile[]>(`${environments.api_url}account/test_accounts`)
  }
}
