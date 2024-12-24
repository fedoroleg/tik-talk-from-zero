import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { AccountCardComponent } from '@tt/common-ui';
import { AccountFiltersComponent } from './account-filters/account-filters.component';
import { Store } from '@ngrx/store';
import { accountsSelectors } from '@tt/accounts/data-access';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, AccountCardComponent, AccountFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  private readonly store = inject(Store);
  public accounts$ = this.store.select(accountsSelectors.selectAccounts);
}
