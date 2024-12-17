import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { accountsActions } from '../../data-access/account.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-account-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account-filters.component.html',
  styleUrl: './account-filters.component.scss',
})
export class AccountFiltersComponent {
  private fb = inject(FormBuilder);
  private readonly store = inject(Store);

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
        tap((value) => {
          this.store.dispatch(
            accountsActions.filterAccounts({ filters: value })
          );
        }),
        takeUntilDestroyed()
      )
      .subscribe((res) => console.log('switchMap returns = ', res));
  }
}
