import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs';
import { AccountsService } from '../../../data-access/services/account.service';

@Component({
  selector: 'app-account-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account-filters.component.html',
  styleUrl: './account-filters.component.scss'
})
export class AccountFiltersComponent {
  private fb = inject(FormBuilder)
  private accountService = inject(AccountsService)

  public searchForm = this.fb.group({
    firstName: '',
    lastName: '',
    stack: '',
  })

  constructor() {
    this.searchForm.valueChanges.pipe(
      debounceTime(300),
      switchMap(formValue => {
        return this.accountService.filterAccounts(formValue)
      })
    ).subscribe()
  }
}
