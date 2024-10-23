import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { AccountsService } from '../../data-access/services/account.service';
import { AccountCardComponent } from "../../common-ui/account-card/account-card.component";


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, NgFor, AccountCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  private readonly accountsService = inject(AccountsService)
  
  public accounts$ = this.accountsService.getTestAccounts()
  public me$ = this.accountsService.getMe()

  constructor() {
    // this.accountsService.getTestAccounts().subscribe(testAccounts => {
    //   console.log('testAccounts', testAccounts);
    // })

    // this.accountsService.getMe().subscribe(me => console.log('me', me)
    // )
  }
}
