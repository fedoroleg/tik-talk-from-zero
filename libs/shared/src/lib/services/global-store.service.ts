import { Injectable, signal } from "@angular/core";
import { Account } from "@tt/common-models";

@Injectable({
  providedIn: 'root'
})
export class GlobalStoreService {
  public me = signal<Account | null>(null) 
}