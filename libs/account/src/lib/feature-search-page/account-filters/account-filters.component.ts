import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { accountsActions } from '../../data-access/account.actions';
import { Store } from '@ngrx/store';
import { selectFilters } from '../../data-access/account.selectors';

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
  private readonly searchFormFilters$ = this.store.select(selectFilters);

  public searchForm = this.fb.group({
    firstName: '',
    lastName: '',
    stack: '',
  });

  constructor() {
    console.log('formvalue befor patch', this.searchForm.value);

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

    console.log('formvalue after patch', this.searchForm.value);
  }
}
