import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { AccountsService } from '../data-access/account.service';
import { AccountCardComponent } from '@tt/common-ui';
import { AccountFiltersComponent } from './account-filters/account-filters.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, NgFor, AccountCardComponent, AccountFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  private readonly accountsService = inject(AccountsService);

  public accounts$ = this.accountsService.filteredAccounts$;

}
