import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { AccountCardComponent } from '@tt/common-ui';
import { AccountFiltersComponent } from './account-filters/account-filters.component';
import { Store } from '@ngrx/store';
import { accountsActions, accountsSelectors } from '@tt/accounts/data-access';
import { InfiniteScrollTriggerComponent } from './infinite-scroll-trigger/infinite-scroll-trigger.component';
import { IntersectionObserverModule } from '@ng-web-apis/intersection-observer';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AccountsListComponent } from './accounts-list/accounts-list.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule,
    AccountCardComponent,
    AccountFiltersComponent,
    InfiniteScrollTriggerComponent,
    IntersectionObserverModule,
    InfiniteScrollDirective,
    AccountsListComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  private readonly store = inject(Store);
  public accounts$ = this.store.select(accountsSelectors.selectAccounts);

  fetchMoreAccounts() {
    this.store.dispatch(accountsActions.getSearchAccountsNextPage());
  }

  onScroll() {
    console.log('scroll');
    this.fetchMoreAccounts();
  }
}
