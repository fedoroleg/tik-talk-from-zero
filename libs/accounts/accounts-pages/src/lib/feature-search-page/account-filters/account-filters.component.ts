import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, take, } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { accountsActions, accountsSelectors } from '@tt/accounts/data-access';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-account-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account-filters.component.html',
  styleUrl: './account-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFiltersComponent {
  private fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly searchFormFilters$ = this.store.select(accountsSelectors.selectAccountsFilters);

  public searchForm = this.fb.group({
    firstName: '',
    lastName: '',
    stack: '',
  });

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe((value) => {
        this.store.dispatch(accountsActions.filterAccounts({ filters: value }));
      });

    this.searchFormFilters$
      .pipe(take(1), takeUntilDestroyed())
      .subscribe((value) => {
        console.log('value in searchFormFilters$', value);
        this.searchForm.patchValue(value);
      });
  }
}
